import { useVueFlow } from '@vue-flow/core';
import { useCanvasStore } from '@stores/CanvasStore';

export function useNodeDragEvent() {
    const canvasStore = useCanvasStore();
    const { onNodeDragStop, onNodeDragStart, onPaneClick } = useVueFlow();
    let position = {
        x: -1,
        y: -1,
    };

    onNodeDragStart((event) => {
        position = event.node.position;
    });

    onNodeDragStop((event) => {
        const node = event.node;
        const positionChanged =
            position.x !== node.position.x && position.y !== node.position.y;
        if (!positionChanged) return;
        node.data.state.isActive = true;
        canvasStore.currentActiveNode = node; // Do not need to create a shallow copy, so we can modify it directly
    });

    onPaneClick(() => {
        canvasStore.currentActiveNode.data.state.isActive = false;
        canvasStore.currentActiveNode = Object.assign({}, {}); // To make it reactive
    });

    return {
        position,
    };
}
