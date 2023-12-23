import { useHistoryStore } from '@stores/History';
import { useCanvasStore } from '@stores/Canvas';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { useVueFlow } from '@vue-flow/core';
import { klona } from 'klona/full';

export function useHistory() {
    const historyStore = useHistoryStore();
    const canvasStore = useCanvasStore();
    const { resetState } = useNodeStateHandler();
    const VueFlow = useVueFlow();

    const _applyChanges = () => {
        if (!VueFlow) return;
        if (historyStore.currentValue === null) return;

        const CurrentValue = klona(historyStore.currentValue);
        canvasStore.currentActiveNode = CurrentValue.payload.currentActiveNode;
        resetState();
        VueFlow.setNodes(() => {
            return CurrentValue.payload.nodes;
        });
        VueFlow.setEdges(() => {
            return CurrentValue.payload.edges;
        });
    };
    const createHistory = (label: string) => {
        if (!VueFlow) return;
        const Item = {
            label,
            payload: {
                nodes: klona(VueFlow.getNodes.value),
                edges: klona(VueFlow.getEdges.value),
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

    const jumpHistory = (index: number) => {
        historyStore.jump(index);
        _applyChanges();
    };

    return {
        createHistory,
        undoHistory,
        redoHistory,
        jumpHistory,
    };
}
