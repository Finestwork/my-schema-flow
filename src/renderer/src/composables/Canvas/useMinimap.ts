import { useCanvasStore } from '@stores/Canvas';
import { useHistoryStore } from '@stores/History';
import { getConnectedNodes } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';
import { watch } from 'vue';

export function useMinimap() {
    const canvasStore = useCanvasStore();
    const historyStore = useHistoryStore();
    const {
        vueFlowRef,
        getEdges,
        onNodeDragStop,
        onEdgeClick,
        onNodeDragStart,
        onPaneClick,
        onPaneReady,
    } = useVueFlow();
    let position = {
        x: -1,
        y: -1,
    };
    let minimapElement: HTMLElement | null = null;
    const _highlightMinimapNodes = () => {
        if (!minimapElement || !canvasStore.hasActiveNode) return;
        const MinimapNodes = minimapElement.querySelectorAll(
            '.vue-flow__minimap-node',
        );
        const { related } = getConnectedNodes(
            canvasStore.currentActiveNode,
            getEdges.value,
        );
        MinimapNodes.forEach((node) => {
            const NodeIndex = related.findIndex(
                (relatedNode) =>
                    relatedNode.source === node.id ||
                    relatedNode.target === node.id,
            );

            if (NodeIndex !== -1) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });
    };

    onPaneReady(() => {
        if (!vueFlowRef.value) return;
        minimapElement = vueFlowRef.value.querySelector('.vue-flow__minimap');
    });

    onPaneClick(() => {
        if (!minimapElement) return;

        const MinimapNodes = minimapElement.querySelectorAll(
            '.vue-flow__minimap-node',
        );
        MinimapNodes.forEach((node) => node.classList.remove('active'));
    });

    onEdgeClick((event) => {
        const currentEdge = event.edge;
        canvasStore.currentActiveNode = currentEdge.sourceNode;
        _highlightMinimapNodes();
    });

    onNodeDragStart((event) => {
        position = event.node.position;
    });

    onNodeDragStop((event) => {
        const Node = event.node;
        const PositionChanged =
            position.x !== Node.position.x && position.y !== Node.position.y;
        if (!PositionChanged && Node.id === canvasStore.currentActiveNode.id)
            return;
        _highlightMinimapNodes();
    });

    watch(
        () => [historyStore.currentValue, canvasStore.currentActiveNode],
        _highlightMinimapNodes,
    );
}
