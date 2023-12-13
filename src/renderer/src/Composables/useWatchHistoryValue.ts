import { useHistoryStore } from '@stores/HistoryStore';
import { useHistory } from '@composables/useHistory';
import { useCanvasMinimap } from '@composables/useCanvasMinimap';
import { Ref, watch } from 'vue';
import type { MiniMap } from '@vue-flow/minimap';

export function useWatchHistoryValue(minimap: Ref<typeof MiniMap>) {
    const historyStore = useHistoryStore();
    const { updateNodesAndEdges } = useHistory();
    const { highlightMinimapNodes, unHighlightMinimapNodes } =
        useCanvasMinimap(minimap);

    watch(
        () => historyStore.currentValue,
        (currentValue) => {
            updateNodesAndEdges();
            unHighlightMinimapNodes();
            const CurrentActiveEdges =
                currentValue?.payload?.currentActiveEdges ?? [];
            highlightMinimapNodes(CurrentActiveEdges);
        },
    );
}
