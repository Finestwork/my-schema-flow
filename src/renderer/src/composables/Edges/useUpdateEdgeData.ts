import { useCanvasStore } from '@stores/Canvas';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useUpdateEdgeData() {
    const canvasStore = useCanvasStore();
    const { getEdges, setEdges } = inject(vueFlowKey);

    const updateColumnBasedOnActiveNode = (newColumnName: string) => {
        const CurrentActiveEdges = getNodeRelationship(
            canvasStore.currentActiveNode,
            getEdges.value,
        );
        setEdges((edges) => {
            return edges.map((edge) => {
                const Index = CurrentActiveEdges.findIndex(
                    (e) => e.id === edge.id,
                );

                if (Index !== -1) {
                    const IsSource =
                        edge.source === canvasStore.currentActiveNode.id;

                    if (IsSource) {
                        edge.data.referenced.column = newColumnName;
                    } else {
                        edge.data.referencing.column = newColumnName;
                    }
                    return edge;
                }

                return edge;
            });
        });
    };

    return {
        updateColumnBasedOnActiveNode,
    };
}
