import { useCanvasStore } from '@stores/CanvasStore';
import { useCalculateEdgePosition } from '@composables/useCalculateEdgePosition';
import { useConnectedNodes } from '@composables/useConnectedNodes';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';
import { v4 as uuidv4 } from 'uuid';
import { nextTick } from 'vue';

export type TRelationFormData = {
    referencingColumn: string;
    referencedTable: string;
    referencedColumn: string;
};

export type TUpdateColumn = {
    originalName: string;
    newName: string;
};

export function useTableRelation() {
    const canvasStore = useCanvasStore();
    const { calculateActiveEdgesPosition } = useCalculateEdgePosition();
    const { highlightNodes, unhighlightNodes } = useConnectedNodes();
    const { addEdges, getNodes, setEdges } = useVueFlow();

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
        highlightNodes();
    };

    const updateRelation = async (relationData: TRelationFormData) => {
        unhighlightNodes();
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
                }

                return edge;
            });
        });
        await nextTick();
        calculateActiveEdgesPosition();
        highlightNodes();
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
