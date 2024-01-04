import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useNodeActions } from '@composables/Nodes/useNodeActions';
import { useTableRelationActions } from '@composables/Table/useTableRelationActions';
import { importSchema, importDDL } from '@utilities/ImportHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, onMounted, onUnmounted, nextTick } from 'vue';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
import { Parser } from 'sql-ddl-to-json-schema';

export function useIPCListeners() {
    const fileStore = useFileStore();
    const historyStore = useHistoryStore();
    const { createHistory } = useHistoryActions();
    const vueFlow = inject(vueFlowKey);
    const { createNodeFromImport } = useNodeActions();
    const { createEdgeFromImport } = useTableRelationActions();
    const { autoLayout } = useNodeAutoLayout();
    const parser = new Parser('mysql');
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
                const contents = await importSchema(file);
                const [nodes, edges] = await contents;
                await nextTick();
                vueFlow.setEdges(() => []);
                vueFlow.setNodes(() => []);
               
                createNodeFromImport(nodes);
                await nextTick();
                createEdgeFromImport(edges, nodes);
                vueFlow.updateNodeInternals();
                await nextTick();
                autoLayout();
            },
        );

        window.electron.ipcRenderer.on('ddlOpened', async (_, file: string) => {
            if (!vueFlow) return;
            historyStore.$reset();
        
            fileStore.$reset();
            const jsonschema = parser.feed(file).toCompactJson(parser.results);
            const contents = await importDDL(jsonschema);
            const [nodes, edges] = await contents;
            vueFlow.setEdges(() => []);
            vueFlow.setNodes(() => []);
            await nextTick();
            createNodeFromImport(nodes);
            await nextTick();
            createEdgeFromImport(edges, nodes);
            await nextTick();
            vueFlow.updateNodeInternals();
            await nextTick();
            autoLayout();
        });
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
            'schemaOpened',
            'ddlOpened',
        ].forEach((listener) => {
            window.electron.ipcRenderer.removeAllListeners(listener);
        });
    });
}
