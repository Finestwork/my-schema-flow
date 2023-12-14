import { useVueFlow } from '@vue-flow/core';
import { useCanvasStore } from '@stores/CanvasStore';
import type { TNode } from '@stores/CanvasStore';

export function useNodeDragEvent() {
    const canvasStore = useCanvasStore();
    const { onNodeDragStop, onNodeDragStart, onPaneClick, onNodeClick } =
        useVueFlow();
    let position = {
        x: -1,
        y: -1,
    };
    const _turnOnNodeActiveState = (node: TNodeData) => {
        // If currently being dragged node is not the same with previously dragged node
        // Remove the state of previously dragged node
        if (canvasStore.currentActiveNode.id !== node.id) {
            canvasStore.removeNodeActiveState();
        }
        node.data.state.isActive = true;
        canvasStore.currentActiveNode = node; // Do not need to create a shallow copy, so we can modify it directly
    };

    onNodeDragStart((event) => {
        position = event.node.position;
    });

    onNodeDragStop((event) => {
        const node = event.node;
        const positionChanged =
            position.x !== node.position.x && position.y !== node.position.y;
        if (!positionChanged) return;
        _turnOnNodeActiveState(node);
    });

    onNodeClick((event) => {
        _turnOnNodeActiveState(event.node);
    });

    onPaneClick(() => {
        canvasStore.removeNodeActiveState();
    });

    return {
        position,
    };
}
