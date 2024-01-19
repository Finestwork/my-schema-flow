import { useModalStore } from '@stores/Modal';
import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
import { importDDL } from '@utilities/ImportHelper';
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

    const importSQLScript = async () => {
        modalStore.showDiagramLoaderModal = true;
        const Result = await window.api.importSQLScript();
        if (Result === null) {
            modalStore.showDiagramLoaderModal = false;
            return;
        }
        const { nodes: Nodes, edges: Edges } = importDDL(Result.contents);
        const GeneratedNodes = generateNodeDataForCanvas(Nodes);
        const GeneratedEdges = generateEdgeDataForCanvas(Edges, Nodes);
        await _displayCanvasData(GeneratedNodes, GeneratedEdges);
        fileStore.savedIndex = 0;
        fileStore.fileName = Result.fileName;
        fileStore.filePath = Result.filePath;
    };

    const importDiagram = async () => {
        if (!vueFlow) return;
        modalStore.showDiagramLoaderModal = true;
        const Result = await window.api.importDiagram();
        if (Result === null) {
            modalStore.showDiagramLoaderModal = false;
            return;
        }
        const Contents = JSON.parse(Result.contents);
        await _displayCanvasData(Contents.nodes, Contents.edges);
        fileStore.savedIndex = 0;
        fileStore.fileName = Result.fileName;
        fileStore.filePath = Result.filePath;
    };

    return {
        importSQLScript,
        importDiagram,
    };
}
