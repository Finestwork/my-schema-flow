import { useCanvasStore } from '@stores/Canvas';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useUpdateEdgeData() {
    const canvasStore = useCanvasStore();
    const VueFlow = inject(vueFlowKey);

    /**
     * This will update the column name from active edge(relationship)
     */
    const updateColumnBasedOnActiveNode = (
        oldColumnName,
        newColumnName: string,
    ) => {
        if (!VueFlow) return;
        const CurrentActiveEdges = getNodeRelationship(
            canvasStore.currentActiveNode,
            VueFlow.getEdges.value,
        );

        VueFlow.setEdges((edges) => {
            return edges.map((edge) => {
                const Index = CurrentActiveEdges.findIndex(
                    (e) => e.id === edge.id,
                );

                if (Index !== -1) {
                    const IsSource =
                        edge.source === canvasStore.currentActiveNode.id;

                    if (
                        IsSource &&
                        edge.data.referenced.column === oldColumnName
                    ) {
                        edge.data.referenced.column = newColumnName;
                    } else if (
                        !IsSource &&
                        edge.data.referenced.column === oldColumnName
                    ) {
                        edge.data.referencing.column = newColumnName;
                    }
                }

                return edge;
            });
        });
    };

    return {
        updateColumnBasedOnActiveNode,
    };
}
