import { useCanvasStore } from '@stores/CanvasStore';
import { useConnectedNodes } from '@composables/useConnectedNodes';
import { useVueFlow } from '@vue-flow/core';

export function useEdgeEvents() {
    const canvasStore = useCanvasStore();
    const { highlightNodes, unhighlightNodes } = useConnectedNodes();
    const { onEdgeClick } = useVueFlow();

    onEdgeClick((event) => {
        unhighlightNodes();
        const currentEdge = event.edge;
        canvasStore.currentActiveNode = currentEdge.sourceNode;
        highlightNodes();
    });
}
