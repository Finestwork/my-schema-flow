import { useCanvasStore } from '@stores/CanvasStore';
import { useConnectedNodes } from '@composables/useConnectedNodes';
import { useCalculateEdgePosition } from '@composables/useCalculateEdgePosition';
import { useVueFlow } from '@vue-flow/core';
import type { TNode } from '@stores/CanvasStore';

export function useNodeDragEvent() {
    const canvasStore = useCanvasStore();
    const { onNodeDragStop, onNodeDragStart, onPaneClick, onNodeClick } =
        useVueFlow();
    const { highlightNodes, unhighlightNodes } = useConnectedNodes();
    const { calculateActiveEdgesPosition } = useCalculateEdgePosition();
    let position = {
        x: -1,
        y: -1,
    };
    const _turnOnNodeActiveState = (node: TNode) => {
        unhighlightNodes();

        // If currently being dragged node is not the same with previously dragged node
        // Remove the state of previously dragged node
        if (canvasStore.currentActiveNode.id !== node.id) {
            canvasStore.removeNodeActiveState();
        }
        node.data.state.isActive = true;
        canvasStore.currentActiveNode = node; // Do not need to create a shallow copy, so we can modify it directl
        highlightNodes();
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
        calculateActiveEdgesPosition();
    });

    onNodeClick((event) => {
        _turnOnNodeActiveState(event.node);
    });

    onPaneClick(() => {
        unhighlightNodes();
        canvasStore.removeNodeActiveState();
    });

    return {
        position,
    };
}
