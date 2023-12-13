import { extractNodeIdFromEdge } from '@utilities/NodeEdgeHelper';
import type { TEdge } from '@stores/TableStore';
import type { Ref } from 'vue';
import type { MiniMap } from '@vue-flow/minimap';

export function useCanvasMinimap(minimap: Ref<typeof MiniMap>) {
    const unHighlightMinimapNodes = () => {
        const CurrentActiveNodes =
            minimap.value.$el.querySelectorAll('rect.active');
        Array.from(CurrentActiveNodes).forEach((rect: Element) => {
            rect.classList.remove('active');
        });
    };
    const highlightMinimapNodes = (currentActiveEdges: TEdge[]) => {
        const NodeIds = extractNodeIdFromEdge(currentActiveEdges);
        if (NodeIds.length === 0) return;
        NodeIds.forEach((id) => {
            const Rect = minimap.value.$el.querySelector(`rect[id='${id}']`);
            if (!Rect) return;
            Rect.classList.add('active');
        });
    };

    return {
        unHighlightMinimapNodes,
        highlightMinimapNodes,
    };
}
