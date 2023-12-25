<script setup lang="ts">
import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, onMounted, onUnmounted } from 'vue';

const fileStore = useFileStore();
const historyStore = useHistoryStore();
const vueFlow = inject(vueFlowKey);
const { saveCanvas } = useSaveCanvas();

onMounted(() => {
    window.electron.ipcRenderer.on(
        'fileSavedSuccessfully',
        (_, filePath, fileName) => {
            if (!vueFlow) return;
            fileStore.savedIndex = historyStore.currentIndex;
            fileStore.fileName = fileName;
            fileStore.filePath = filePath;
        },
    );
});

onUnmounted(() => {
    window.electron.ipcRenderer.removeAllListeners('fileSavedSuccessfully');
});
</script>
<template>
    <button
        class="duration-750 rounded px-3 py-1.5 text-xs font-semibold outline-none transition-shadow ease-in-out dark:bg-cyan-500/90 dark:text-white dark:shadow-[0_0_13px_1px_#06b6d487] hover:dark:bg-cyan-500/80 dark:hover:shadow-[0_0_13px_1px_#06b6d447] focus:dark:bg-cyan-500/80 dark:focus:shadow-[0_0_13px_1px_#06b6d447]"
        type="button"
        @click="saveCanvas"
    >
        Save
    </button>
</template>
