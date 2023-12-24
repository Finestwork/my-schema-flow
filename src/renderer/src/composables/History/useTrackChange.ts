import { useHistoryStore } from '@stores/History';
import { useFileStore } from '@stores/File';
import { useFileStore } from '@stores/File';
import { vueFlowKey } from '@symbols/VueFlow';
import { ref, inject, nextTick } from 'vue';
import { isEqual } from 'lodash';

export function useTrackChange() {
    const historyStore = useHistoryStore();
    const fileStore = useFileStore();
    const vueFlow = inject(vueFlowKey);
    const hasChanged = ref(false);

    historyStore.$subscribe(
        async () => {
            await nextTick();

            if (!vueFlow || !fileStore.hasCanvasElements) return;

            const SavedFile = JSON.parse(fileStore.canvasElements);
            const VueFlowObject = vueFlow.toObject();
            const ChangedNodes = SavedFile.nodes.filter(
                (node, ind) => !isEqual(node, VueFlowObject.nodes[ind]),
            );

            const ChangedEdges = SavedFile.edges.filter(
                (edge, ind) => !isEqual(edge, VueFlowObject.edges[ind]),
            );

            hasChanged.value =
                ChangedNodes.length !== 0 || ChangedEdges.length !== 0;
        },
        { flush: 'post' },
    );

    return {
        hasChanged,
    };
}
