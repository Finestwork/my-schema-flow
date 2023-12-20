import { useHistoryStore } from '@stores/HistoryStore';
import { useCanvasStore } from '@stores/CanvasStore';
import { useVueFlow } from '@vue-flow/core';
import { klona } from 'klona/full';

export function useHistory() {
    const historyStore = useHistoryStore();
    const canvasStore = useCanvasStore();
    const { getNodes, getEdges, setEdges, setNodes } = useVueFlow();
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

    const undoHistory = () => {
        historyStore.undo();
        const CurrentValue = klona(historyStore.currentValue);
        canvasStore.currentActiveNode = CurrentValue.payload.currentActiveNode;
        setNodes(() => CurrentValue.payload.nodes);
        setEdges(() => CurrentValue.payload.edges);
    };

    const redoHistory = () => {
        historyStore.redo();
        const CurrentValue = klona(historyStore.currentValue);
        canvasStore.currentActiveNode = CurrentValue.payload.currentActiveNode;
        setNodes(() => CurrentValue.payload.nodes);
        setEdges(() => CurrentValue.payload.edges);
    };

    return {
        createHistory,
        undoHistory,
        redoHistory,
    };
}
