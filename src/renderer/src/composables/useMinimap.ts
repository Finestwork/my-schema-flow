import { useCanvasStore } from '@stores/CanvasStore';
import { getConnectedNodes } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';
import { toValue } from 'vue';
import type { MiniMap } from '@vue-flow/minimap';
import type { Ref } from 'vue';

export function useMinimap(minimap: Ref<typeof MiniMap>) {
    const canvasStore = useCanvasStore();
    const {
        getEdges,
        onNodeDragStop,
        onNodeClick,
        onNodeDragStart,
        onPaneClick,
    } = useVueFlow();
    let position = {
        x: -1,
        y: -1,
    };
    const _highlightMinimapNodes = () => {
        const MinimapWrapper = toValue(minimap);
        const MinimapNodes = MinimapWrapper.$el.querySelectorAll(
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

    onPaneClick(() => {
        const MinimapWrapper = toValue(minimap);
        const MinimapNodes = MinimapWrapper.$el.querySelectorAll(
            '.vue-flow__minimap-node',
        );
        MinimapNodes.forEach((node) => node.classList.remove('active'));
    });

    onNodeClick(_highlightMinimapNodes);

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
}
