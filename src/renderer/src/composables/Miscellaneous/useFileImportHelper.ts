import { useModalStore } from '@stores/Modal';
import { useCanvasStore } from '@stores/Canvas';
import { useFileStore } from '@stores/File';
import { useHistoryStore } from '@stores/History';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
import { useTrackChange } from '@composables/History/useTrackChange';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { importDDL } from '@utilities/ImportHelper';
import {
    generateEdgeDataForCanvas,
    generateNodeDataForCanvas,
} from '@utilities/GenerateCanvasDataHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, nextTick } from 'vue';

export function useFileImportHelper() {
    const canvasStore = useCanvasStore();
    const modalStore = useModalStore();
    const fileStore = useFileStore();
    const historyStore = useHistoryStore();
    const { saveCanvas } = useSaveCanvas();
    const vueFlow = inject(vueFlowKey);
    const { createHistory } = useHistoryActions();
    const { autoLayout } = useNodeAutoLayout();
    const { hasChanged } = useTrackChange();

    const checkUnsavedDiagrams = async () => {
        // Check if user decided to save the file before displaying the diagrams from sql script
        // If the user hasn't saved the file yet but there are existing items, show save confirmation dialog
        const ShouldSaveCurrentNodes =
            (fileStore.filePath !== '' && hasChanged.value) ||
            (fileStore.filePath === '' &&
                vueFlow &&
                vueFlow.nodes.value.length !== 0);

        if (ShouldSaveCurrentNodes) {
            const Message = 'Do you want to save your changes?';
            const Title = 'Save Confirmation';
            const Result = await window.api.showSaveConfirmationDialog(
                Message,
                Title,
            );
            // If the user decides to save the file before importing
            if (Result === 0) {
                const { isCanceled } = await saveCanvas();
                if (isCanceled) {
                    modalStore.showDiagramLoaderModal = false;
                }
                return {
                    isCanceled,
                };
            }
        }

        return {
            isCanceled: false,
        };
    };

    const importSQLScript = async () => {
        if (!vueFlow) return;
        modalStore.showDiagramLoaderModal = true;
        const Script = await window.api.importSQLScript();

        if (Script === null) {
            modalStore.showDiagramLoaderModal = false;
            return;
        }

        const { isCanceled } = await checkUnsavedDiagrams();
        if (isCanceled) return;
        const { nodes: Nodes, edges: Edges } = importDDL(Script);
        const GeneratedNodes = generateNodeDataForCanvas(Nodes);
        const GeneratedEdges = generateEdgeDataForCanvas(Edges, Nodes);
        canvasStore.$reset();
        historyStore.$reset();
        fileStore.$reset();
        vueFlow.setNodes(() => GeneratedNodes);
        vueFlow.setEdges(() => GeneratedEdges);
        await nextTick();
        vueFlow.updateNodeInternals();
        await nextTick();
        autoLayout();
        await createHistory(`Diagram Generated`);

        // Add delay to avoid content jumping
        setTimeout(() => {
            modalStore.showDiagramLoaderModal = false;
        }, 1000);
    };

    const importDiagram = async () => {
        if (!vueFlow) return;
        modalStore.showDiagramLoaderModal = true;
        const Result = await window.api.importDiagram();
        if (Result === null) {
            modalStore.showDiagramLoaderModal = false;
            return;
        }

        const { isCanceled } = await checkUnsavedDiagrams();
        if (isCanceled) return;
        const Contents = JSON.parse(Result.contents);
        canvasStore.$reset();
        historyStore.$reset();
        fileStore.$reset();
        vueFlow.setNodes(() => Contents.nodes);
        vueFlow.setEdges(() => Contents.edges);
        await nextTick();
        vueFlow.updateNodeInternals();
        await createHistory(`Diagram Imported`);
        fileStore.savedIndex = 0;
        fileStore.fileName = Result.fileName;
        fileStore.filePath = Result.filePath;
        // Add delay to avoid content jumping
        setTimeout(() => {
            modalStore.showDiagramLoaderModal = false;
        }, 1000);
    };

    return {
        importSQLScript,
        importDiagram,
    };
}
