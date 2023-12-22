import { useCanvasStore } from '@stores/Canvas';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { v4 as uuidv4 } from 'uuid';
import { nextTick, inject } from 'vue';

export type TRelationFormData = {
    referencingColumn: string;
    referencedTable: string;
    referencedColumn: string;
};

export type TUpdateColumn = {
    originalName: string;
    newName: string;
};

export function useTableRelationActions() {
    const canvasStore = useCanvasStore();
    const { calculateActiveEdgesPosition } = useEdgePositionCalculator();
    const { resetState, activateState } = useNodeStateHandler();
    const { addEdges, getNodes, setEdges } = inject(vueFlowKey);

    const addRelation = (relationData: TRelationFormData) => {
        const ReferencedNode = findNodeByTableName(
            relationData.referencedTable,
            getNodes.value,
        );
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
            },
        };
        addEdges([EdgeObj]);
        calculateActiveEdgesPosition();
        activateState();
    };

    const updateRelation = async (relationData: TRelationFormData) => {
        resetState();
        const ReferencingNode = canvasStore.currentActiveEdge.targetNode;
        const ReferencedNode = findNodeByTableName(
            relationData.referencedTable,
            getNodes.value,
        );
        setEdges((edges) => {
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
                    canvasStore.currentActiveNode = ReferencingNode;
                }
                return edge;
            });
        });
        await nextTick();
        calculateActiveEdgesPosition();
        activateState();
    };

    const updateColumnRelation = (data: TUpdateColumn) => {
        setEdges((edges) => {
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

    return {
        addRelation,
        updateRelation,
        updateColumnRelation,
    };
}
