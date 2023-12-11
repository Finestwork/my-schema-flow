import { useHistoryStore } from '@stores/HistoryStore';
import { useCanvasMinimap } from '@composables/useCanvasMinimap';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { watch } from 'vue';
import { klona } from 'klona/full';
import type { Ref } from 'vue';
import { MiniMap } from '@vue-flow/minimap';

export function useWatchHistory(minimap: Ref<typeof MiniMap>) {
    const historyState = useHistoryStore();

    const { setEdges, setNodes } = useVueFlow();
    const updateNodes = () => {
        const { highlightMinimapNodes, unHighlightMinimapNodes } = useCanvasMinimap(minimap);
        unHighlightMinimapNodes();
        setNodes(() => {
            return historyState.currentValue.payload.nodes.map((node) => klona(node));
        });
        setEdges(() => {
            return historyState.currentValue.payload.edges.map((edge) => {
                edge.animated ??= edge?.animated ?? false;
                edge.style ??= edge?.style ?? {};
                const { targetHandle, sourceHandle } = calculateEdgePosition(edge);
                edge.sourceHandle = sourceHandle;
                edge.targetHandle = targetHandle;

                return klona(edge);
            });
        });
        const CurrentActiveEdges = historyState.currentValue?.payload?.currentActiveEdges ?? [];
        highlightMinimapNodes(CurrentActiveEdges);
    };

    watch(
        () => historyState.runUndo,
        (runUndo) => {
            if (runUndo) {
                updateNodes();
                historyState.runUndo = false;
            }
        },
    );
    watch(
        () => historyState.runRedo,
        (runRedo) => {
            if (runRedo) {
                updateNodes();
                historyState.runRedo = false;
            }
        },
    );
}
