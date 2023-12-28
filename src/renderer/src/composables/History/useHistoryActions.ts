import { useHistoryStore } from '@stores/History';
import { useCanvasStore } from '@stores/Canvas';
import { useVueFlow } from '@vue-flow/core';
import { klona } from 'klona/full';
import { nextTick } from 'vue';
import {
    resetEdgesActiveState,
    resetNodesActiveState,
} from '@utilities/CanvasHelper';

export function useHistoryActions() {
    const historyStore = useHistoryStore();
    const canvasStore = useCanvasStore();
    const VueFlow = useVueFlow();

    const _applyChanges = async () => {
        if (!VueFlow) return;
        if (historyStore.currentValue === null) return;

        const CurrentValue = klona(historyStore.currentValue);
        canvasStore.currentActiveNode = Object.assign({}, {});
        canvasStore.currentActiveEdge = Object.assign({}, {});

        VueFlow.setNodes(() => []);
        VueFlow.setEdges(() => []);
        await nextTick();
        VueFlow.setNodes(() => CurrentValue.payload.nodes);
        VueFlow.setEdges(() => CurrentValue.payload.edges);
    };
    const createHistory = async (label: string) => {
        if (!VueFlow) return;
        await nextTick();
        const Nodes = resetNodesActiveState(VueFlow.getNodes.value);
        const Edges = resetEdgesActiveState(VueFlow.getEdges.value);

        const Item = {
            label,
            payload: {
                nodes: Nodes,
                edges: Edges,
            },
        };
        historyStore.addItem(Item);
    };

    const undoHistory = () => {
        if (!historyStore.canUndo) return;
        historyStore.undo();
        _applyChanges();
    };

    const redoHistory = () => {
        if (!historyStore.canRedo) return;
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
