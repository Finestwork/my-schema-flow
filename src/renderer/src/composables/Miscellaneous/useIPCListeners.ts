import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, onMounted, onUnmounted } from 'vue';

export function useIPCListeners() {
    const fileStore = useFileStore();
    const historyStore = useHistoryStore();
    const vueFlow = inject(vueFlowKey);

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

        window.electron.ipcRenderer.on('fileOverwroteSuccessfully', () => {
            fileStore.savedIndex = historyStore.currentIndex;
        });
    });

    onUnmounted(() => {
        window.electron.ipcRenderer.removeAllListeners('fileSavedSuccessfully');
        window.electron.ipcRenderer.removeAllListeners(
            'fileOverwroteSuccessfully',
        );
    });
}
