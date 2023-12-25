import { useCanvasStore } from '@stores/Canvas';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { useVueFlow } from '@vue-flow/core';

export function useEdgeEvents() {
    const canvasStore = useCanvasStore();
    const { activateState } = useNodeStateHandler();
    const { onEdgeClick } = useVueFlow();

    onEdgeClick((event) => {
        const currentEdge = event.edge;
        canvasStore.currentActiveNode = currentEdge.sourceNode;
        activateState();
    });
}