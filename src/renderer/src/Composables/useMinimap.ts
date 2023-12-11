import { extractNodeIdFromEdge } from '@utilities/NodeEdgeHelper';
import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { TEdge } from '@stores/TableStore';

export function useMinimap(minimap: MaybeRefOrGetter) {
    const unHighlightMinimapNodes = () => {
        const CurrentActiveNodes = minimap.value.$el.querySelectorAll('rect.active');
        Array.from(CurrentActiveNodes).forEach((rect) => {
            rect.classList.remove('active');
        });
    };
    const highlightMinimapNodes = (currentActiveEdges: TEdge[]) => {
        const NodeIds = extractNodeIdFromEdge(toValue(currentActiveEdges));
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
