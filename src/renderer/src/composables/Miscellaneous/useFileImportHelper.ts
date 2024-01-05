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
    const fileStore = useFileStore();
    const historyStore = useHistoryStore();
    const vueFlow = inject(vueFlowKey);
    const { createHistory } = useHistoryActions();
    const { autoLayout } = useNodeAutoLayout();

    const _displayCanvasData = async (nodes, edges) => {
        if (!vueFlow) return;
        const GeneratedNodes = generateNodeDataForCanvas(nodes);
        const GeneratedEdges = generateEdgeDataForCanvas(edges, nodes);
        historyStore.$reset();
        fileStore.$reset();
        vueFlow.setEdges(() => []);
        vueFlow.setNodes(() => []);
        await nextTick();
        vueFlow.addNodes(GeneratedNodes);
        vueFlow.addEdges(GeneratedEdges);
        await nextTick();
        vueFlow.updateNodeInternals();
        autoLayout();
        await nextTick();
        createHistory(`Initial Load`);
    };
    const importDatabaseFile = async () => {
        const ImportedFile = await window.api.importDatabaseFile();
        if (ImportedFile === null) return;
        const { nodes: Nodes, edges: Edges } =
            await readImportedDatabaseFile(ImportedFile);
        _displayCanvasData(Nodes, Edges);
    };

    const importSQLScript = async () => {
        const Script = await window.api.importSQLScript();
        if (Script === null) return;
        const { nodes: Nodes, edges: Edges } = importDDL(Script);
        _displayCanvasData(Nodes, Edges);
    };

    const importDiagram = async () => {
        if (!vueFlow) return;
        const Result = await window.api.importDiagram();
        if (Result === null) return;
        const Contents = JSON.parse(Result.contents);
        fileStore.fileName = Result.fileName;
        fileStore.filePath = Result.filePath[0];
        fileStore.savedIndex = 0;
        historyStore.$reset();
        fileStore.$reset();
        vueFlow.setEdges(() => []);
        vueFlow.setNodes(() => []);
        await nextTick();
        vueFlow.addNodes(Contents.nodes);
        vueFlow.addEdges(Contents.edges);
        await nextTick();
        vueFlow.updateNodeInternals();
        autoLayout();
        await nextTick();
        createHistory(`Initial Load`);
    };
    return {
        importDatabaseFile,
        importSQLScript,
        importDiagram,
    };
}
