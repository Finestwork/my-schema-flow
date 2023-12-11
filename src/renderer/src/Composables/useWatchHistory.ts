import { useHistoryStore } from '@stores/HistoryStore';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { watch } from 'vue';
import { klona } from 'klona/full';

export function useWatchHistory() {
    const historyState = useHistoryStore();
    const { setEdges, setNodes } = useVueFlow();
    const updateNodes = () => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                const SavedNodes = historyState.currentValue.payload.nodes;
                const RetrievedNode = SavedNodes.find((n) => n.id === node.id);
                return klona(RetrievedNode);
            });
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
