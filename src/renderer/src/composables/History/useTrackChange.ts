import { useHistoryStore } from '@stores/History';
import { useFileStore } from '@stores/File';
import { computed } from 'vue';

export function useTrackChange() {
    const historyStore = useHistoryStore();
    const fileStore = useFileStore();
    const hasChanged = computed(() => {
        if (fileStore.savedIndex === -1) return false;
        return historyStore.currentIndex !== fileStore.savedIndex;
    });

    return {
        hasChanged,
    };
}
