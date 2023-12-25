import { useHistoryStore } from '@stores/History';
import { useFileStore } from '@stores/File';
import { vueFlowKey } from '@symbols/VueFlow';
import { ref, inject, nextTick } from 'vue';

export function useTrackChange() {
    const historyStore = useHistoryStore();
    const fileStore = useFileStore();
    const vueFlow = inject(vueFlowKey);
    const hasChanged = ref(false);

    historyStore.$subscribe(
        async () => {
            await nextTick();
            if (!vueFlow || fileStore.savedIndex === -1) return;
            hasChanged.value =
                historyStore.currentIndex !== fileStore.savedIndex;
        },
        { flush: 'post' },
    );

    return {
        hasChanged,
    };
}
