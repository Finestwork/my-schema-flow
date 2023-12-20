import { useHistoryStore } from '@stores/HistoryStore';
import { useCanvasStore } from '@stores/CanvasStore';
import { useVueFlow } from '@vue-flow/core';
import { klona } from 'klona/full';

export function useHistory() {
    const historyStore = useHistoryStore();
    const canvasStore = useCanvasStore();
    const { getNodes, getEdges } = useVueFlow();
    const createHistory = (label: string) => {
        const Item = {
            label,
            payload: {
                nodes: klona(getNodes.value),
                edges: klona(getEdges.value),
                currentActiveNode: klona(canvasStore.currentActiveNode),
            },
        };
        historyStore.addItem(Item);
    };

    return {
        createHistory,
    };
}
