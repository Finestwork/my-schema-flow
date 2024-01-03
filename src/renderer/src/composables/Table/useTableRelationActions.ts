import { useCanvasStore } from '@stores/Canvas';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { createEdges } from '@utilities/NodeEdgeHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { v4 as uuidv4 } from 'uuid';
import { nextTick, inject } from 'vue';

export type TRelationFormData = {
    referencingColumn: string;
    referencedTable: string;
    referencedColumn: string;
    constraint: {
        onDelete: string;
        onUpdate: string;
    };
};

export type TUpdateColumn = {
    originalName: string;
    newName: string;
};

export function useTableRelationActions() {
    const canvasStore = useCanvasStore();
    const { calculateActiveEdgesPosition } = useEdgePositionCalculator();
    const { activateState } = useNodeStateHandler();
    const VueFlow = inject(vueFlowKey);

    const addRelation = (relationData: TRelationFormData) => {
        if (!VueFlow) return;

        const ReferencedNode = findNodeByTableName(
            relationData.referencedTable,
            VueFlow.getNodes.value,
        );

        if (!ReferencedNode) return;

        const EdgeObj = {
            id: uuidv4(),
            source: ReferencedNode.id,
            target: canvasStore.currentActiveNode.id,
            data: {
                referenced: {
                    column: relationData.referencedColumn,
                },
                referencing: {
                    column: relationData.referencingColumn,
                },
                constraint: {
                    onDelete: relationData.constraint.onDelete,
                    onUpdate: relationData.constraint.onUpdate,
                },
            },
        };
        VueFlow.addEdges([EdgeObj]);
        calculateActiveEdgesPosition();
        activateState();
    };

    const deleteRelation = () => {
        if (!VueFlow) return;
        VueFlow.setEdges((edges) => {
            return edges.filter(
                (edge) => edge.id !== canvasStore.currentActiveEdge.id,
            );
        });
        canvasStore.currentActiveEdge = Object.assign({}, {});
        activateState();
    };

    const deleteRelationByColumn = (columnName: string) => {
        if (!VueFlow) return;
        VueFlow.setEdges((edges) => {
            return edges.filter((edge) => {
                return (
                    edge.data.referenced.column !== columnName ||
                    edge.data.referencing.column !== columnName
                );
            });
        });
    };

    const updateRelation = async (relationData: TRelationFormData) => {
        if (!VueFlow) return;
        const ReferencingNode = canvasStore.currentActiveEdge.targetNode;
        const ReferencedNode = findNodeByTableName(
            relationData.referencedTable,
            VueFlow.getNodes.value,
        );

        if (!ReferencedNode) return;

        VueFlow.setEdges((edges) => {
            return edges.map((edge) => {
                if (edge.id === canvasStore.currentActiveEdge.id) {
                    edge.target = ReferencingNode.id;
                    edge.source = ReferencedNode.id;
                    edge.data = {
                        referenced: {
                            column: relationData.referencedColumn,
                        },
                        referencing: {
                            column: relationData.referencingColumn,
                        },
                    };

                    // The Current active node will now be the referencing node
                    canvasStore.currentActiveNode = edge.targetNode;
                }
                return edge;
            });
        });
        await nextTick();
        activateState();
        calculateActiveEdgesPosition();
    };

    const updateColumnRelation = (data: TUpdateColumn) => {
        if (!VueFlow) return;
        VueFlow.setEdges((edges) => {
            return edges.map((edge) => {
                if (edge.data.referenced.column === data.originalName) {
                    edge.data.referenced.column = data.newName;
                }

                if (edge.data.referencing.column === data.originalName) {
                    edge.data.referencing.column = data.newName;
                }

                return edge;
            });
        });
    };

    const createEdgeFromImport = (edges, nodes) => {
        const Edges = createEdges(edges, nodes);
        VueFlow?.setEdges(Edges);
    };

    return {
        addRelation,
        deleteRelation,
        deleteRelationByColumn,
        updateRelation,
        updateColumnRelation,
        createEdgeFromImport,
    };
}
