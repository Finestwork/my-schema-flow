import { useHistoryStore } from '@stores/HistoryStore';
import { useCanvasStore } from '@stores/CanvasStore';
import { useConnectedNodes } from '@composables/useConnectedNodes';
import { useVueFlow } from '@vue-flow/core';
import { klona } from 'klona/full';

export function useHistory() {
    const historyStore = useHistoryStore();
    const canvasStore = useCanvasStore();
    const { resetNodesAndEdges } = useConnectedNodes();
    const { getNodes, getEdges, setEdges, setNodes } = useVueFlow();

    const _applyChanges = () => {
        const CurrentValue = klona(historyStore.currentValue);
        canvasStore.currentActiveNode = CurrentValue.payload.currentActiveNode;
        resetNodesAndEdges();
        setNodes(() => {
            return CurrentValue.payload.nodes;
        });
        setEdges(() => {
            return CurrentValue.payload.edges;
        });
    };
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
        _applyChanges();
    };

    const redoHistory = () => {
        historyStore.redo();
        _applyChanges();
    };

    return {
        createHistory,
        undoHistory,
        redoHistory,
    };
}
