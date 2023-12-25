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

        window.electron.ipcRenderer.on('fileOverwriteSuccessfully', () => {
            fileStore.savedIndex = historyStore.currentIndex;
        });

        window.electron.ipcRenderer.on(
            'fileNameOverwriteSuccessfully',
            (_, filePath: string, fileName: string) => {
                fileStore.fileName = fileName;
                fileStore.filePath = filePath;
            },
        );
    });

    onUnmounted(() => {
        window.electron.ipcRenderer.removeAllListeners('fileSavedSuccessfully');
        window.electron.ipcRenderer.removeAllListeners(
            'fileOverwroteSuccessfully',
        );
        window.electron.ipcRenderer.removeAllListeners(
            'filenameOverwriteSuccessfully',
        );
    });
}
