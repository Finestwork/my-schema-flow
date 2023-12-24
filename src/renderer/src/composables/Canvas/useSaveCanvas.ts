import { useFileStore } from '@stores/File';
import { useTrackChange } from '@composables/History/useTrackChange';
import {
    resetEdgesActiveState,
    resetNodesActiveState,
} from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';
import type { TEdge, TNode } from '@stores/Canvas';

export function useSaveCanvas() {
    const fileStore = useFileStore();
    const vueFlow = inject(vueFlowKey);
    const { hasChanged } = useTrackChange();

    const saveCanvas = () => {
        console.log(hasChanged.value);
        if (!vueFlow || (!hasChanged.value && fileStore.filePath.trim() !== ''))
            return;

        const FlowObject = vueFlow.toObject();
        const Contents = {
            edges: resetEdgesActiveState(FlowObject.edges as Array<TEdge>),
            nodes: resetNodesActiveState(FlowObject.nodes as Array<TNode>),
        };

        window.api.saveFile(JSON.stringify(Contents));
    };

    return {
        saveCanvas,
    };
}
