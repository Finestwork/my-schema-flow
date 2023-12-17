import { useCanvasStore } from '@stores/CanvasStore';
import { useCalculateEdgePosition } from '@composables/useCalculateEdgePosition';
import { useConnectedNodes } from '@composables/useConnectedNodes';
import { findNodeByTableName } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';
import { v4 as uuidv4 } from 'uuid';

export type TRelationFormData = {
    referencingColumn: string;
    referencedTable: string;
    referencedColumn: string;
};

export function useTableRelation() {
    const canvasStore = useCanvasStore();
    const { calculateActiveEdgesPosition } = useCalculateEdgePosition();
    const { highlightNodes } = useConnectedNodes();
    const { addEdges, getNodes } = useVueFlow();

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

    return {
        addRelation,
    };
}
