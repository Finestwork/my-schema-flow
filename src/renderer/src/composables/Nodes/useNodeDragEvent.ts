import { useCanvasStore } from '@stores/Canvas';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useVueFlow } from '@vue-flow/core';
import type { TNode } from '@stores/Canvas';

export function useNodeDragEvent() {
    const canvasStore = useCanvasStore();
    const { createHistory } = useHistoryActions();
    const { onNodeDragStop, onNodeDragStart, onPaneClick, onNodeClick } =
        useVueFlow();
    const { activateState, resetState } = useNodeStateHandler();
    const { calculateActiveEdgesPosition, calculateAllEdgesPosition } =
        useEdgePositionCalculator();
    let position = {
        x: -1,
        y: -1,
    };
    const _turnOnNodeActiveState = (node: TNode) => {
        canvasStore.currentActiveNode = node; // No need to create shallow copy, so we can directly mutate the object
        activateState();
    };

    onNodeDragStart((event) => {
        position = event.node.position;
    });

    onNodeDragStop(async (event) => {
        const Node = event.node;
        const PositionChanged =
            position.x !== Node.position.x && position.y !== Node.position.y;
        if (!PositionChanged) return;

        _turnOnNodeActiveState(Node);

        if (canvasStore.hasActiveNode) {
            calculateActiveEdgesPosition();
        } else {
            calculateAllEdgesPosition();
        }
        const CurrentNodeName = Node.data.table.name;
        createHistory(`Moved Table: '${CurrentNodeName}'`);
    });

    onNodeClick((event) => {
        if (event.node.id === canvasStore.currentActiveNode.id) return;
        _turnOnNodeActiveState(event.node);
    });

    onPaneClick(() => {
        resetState();
        canvasStore.currentActiveNode = Object.assign({}, {});
    });

    return {
        position,
    };
}
