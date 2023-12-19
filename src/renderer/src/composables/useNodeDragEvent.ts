import { useCanvasStore } from '@stores/CanvasStore';
import { useConnectedNodes } from '@composables/useConnectedNodes';
import { useCalculateEdgePosition } from '@composables/useCalculateEdgePosition';
import { useVueFlow } from '@vue-flow/core';
import type { TNode } from '@stores/CanvasStore';
import { klona } from 'klona/json';

export function useNodeDragEvent() {
    const canvasStore = useCanvasStore();
    const { onNodeDragStop, onNodeDragStart, onPaneClick, onNodeClick } =
        useVueFlow();
    const { highlightNodes, unhighlightNodes } = useConnectedNodes();
    const { calculateActiveEdgesPosition, calculateAllEdgesPosition } =
        useCalculateEdgePosition();
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

        // Need to create a deep copy because some components are watching or using this as a computed property
        canvasStore.currentActiveNode = klona(node);
        highlightNodes();
    };

    onNodeDragStart((event) => {
        position = event.node.position;
    });

    onNodeDragStop((event) => {
        const Node = event.node;
        const PositionChanged =
            position.x !== Node.position.x && position.y !== Node.position.y;
        if (!PositionChanged) return;

        _turnOnNodeActiveState(Node);

        if (canvasStore.hasActiveNode) {
            calculateActiveEdgesPosition();
            return;
        }

        calculateAllEdgesPosition();
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
