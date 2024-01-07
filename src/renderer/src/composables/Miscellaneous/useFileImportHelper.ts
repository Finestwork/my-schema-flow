import { useModalStore } from '@stores/Modal';
import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
import { importDDL, readImportedDatabaseFile } from '@utilities/ImportHelper';
import {
    generateEdgeDataForCanvas,
    generateNodeDataForCanvas,
} from '@utilities/GenerateCanvasDataHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, nextTick } from 'vue';
import { useHistoryActions } from '@composables/History/useHistoryActions';

export function useFileImportHelper() {
    const modalStore = useModalStore();
    const fileStore = useFileStore();
    const historyStore = useHistoryStore();
    const vueFlow = inject(vueFlowKey);
    const { createHistory } = useHistoryActions();
    const { autoLayout } = useNodeAutoLayout();

    const _displayCanvasData = async (nodes, edges) => {
        if (!vueFlow) return;
        modalStore.showDiagramLoaderModal = true;
        historyStore.$reset();
        fileStore.$reset();
        vueFlow.setEdges(() => []);
        vueFlow.setNodes(() => []);
        await nextTick();
        vueFlow.addNodes(nodes);
        vueFlow.addEdges(edges);
        await nextTick();
        vueFlow.updateNodeInternals();
        autoLayout();
        await nextTick();
        createHistory(`Initial Load`);

        // Add delay to avoid content jumping
        setTimeout(() => {
            modalStore.showDiagramLoaderModal = false;
        }, 1000);
    };
    const importDatabaseFile = async () => {
        const ImportedFile = await window.api.importDatabaseFile();
        if (ImportedFile === null) return;
        const { nodes: Nodes, edges: Edges } =
            await readImportedDatabaseFile(ImportedFile);
        const GeneratedNodes = generateNodeDataForCanvas(Nodes);
        const GeneratedEdges = generateEdgeDataForCanvas(Edges, Nodes);
        _displayCanvasData(GeneratedNodes, GeneratedEdges);
    };

    const importSQLScript = async () => {
        const Script = await window.api.importSQLScript();
        if (Script === null) return;
        const { nodes: Nodes, edges: Edges } = importDDL(Script);
        const GeneratedNodes = generateNodeDataForCanvas(Nodes);
        const GeneratedEdges = generateEdgeDataForCanvas(Edges, Nodes);
        _displayCanvasData(GeneratedNodes, GeneratedEdges);
    };

    const importDiagram = async () => {
        if (!vueFlow) return;
        const Result = await window.api.importDiagram();
        if (Result === null) return;
        const Contents = JSON.parse(Result.contents);
        fileStore.fileName = Result.fileName;
        fileStore.filePath = Result.filePath[0];
        fileStore.savedIndex = 0;
        _displayCanvasData(Contents.nodes, Contents.edges);
    };

    const playgroundDatabaseFile = async () => {
        const ImportedFile = await window.api.importDatabaseFile();
        if (ImportedFile === null) return;
        return ImportedFile;
    };
    return {
        importDatabaseFile,
        importSQLScript,
        importDiagram,
        playgroundDatabaseFile,
    };
}
