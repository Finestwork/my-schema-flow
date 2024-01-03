import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useNodeActions } from '@composables/Nodes/useNodeActions';
import { useTableRelationActions } from '@composables/Table/useTableRelationActions';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, onMounted, onUnmounted } from 'vue';
import { importHelper } from '@utilities/ImportHelper';

export function useIPCListeners() {
    const fileStore = useFileStore();
    const historyStore = useHistoryStore();
    const { createHistory } = useHistoryActions();
    const vueFlow = inject(vueFlowKey);
    const { createNodeFromImport } = useNodeActions();
    const { createEdgeFromImport } = useTableRelationActions();
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

        window.electron.ipcRenderer.on(
            'schemaOpened',
            async (_, file: Uint8Array) => {
                if (!vueFlow) return;
                historyStore.$reset();
                fileStore.$reset();
                const contents = await importHelper(file);
                const [nodes, edges] = contents;
                createNodeFromImport(nodes), createEdgeFromImport(edges, nodes);
            },
        );

        window.electron.ipcRenderer.on(
            'filedOpened',
            (_, file: string, filePath: string, fileName: string) => {
                if (!vueFlow) return;
                historyStore.$reset();
                fileStore.$reset();
                const Contents = JSON.parse(file);
                fileStore.fileName = fileName;
                fileStore.filePath = filePath[0];
                fileStore.savedIndex = 0;
                vueFlow.setNodes(() => Contents.nodes);
                vueFlow.setEdges(() => Contents.edges);
                createHistory('Initial Load');
            },
        );
    });

    onUnmounted(() => {
        [
            'fileSavedSuccessfully',
            'fileOverwroteSuccessfully',
            'filenameOverwriteSuccessfully',
            'filedOpened',
        ].forEach((listener) => {
            window.electron.ipcRenderer.removeAllListeners(listener);
        });
    });
}
