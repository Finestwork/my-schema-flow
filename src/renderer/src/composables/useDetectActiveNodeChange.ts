import { useCanvasStore } from '@stores/CanvasStore';
import { useVueFlow } from '@vue-flow/core';

export function useDetectActiveNodeChange() {
    const canvasStore = useCanvasStore();
    const { onNodeClick } = useVueFlow();

    const activeNodeChanged = (cb: () => void) => {
        onNodeClick((event) => {
            const Node = event.node;
            if (Node.id !== canvasStore.currentActiveNode.id) {
                cb();
            }
        });
    };

    return {
        activeNodeChanged,
    };
}
