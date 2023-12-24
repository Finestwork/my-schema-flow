<script setup lang="ts">
import { useFileStore } from '@stores/File';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import {
    resetNodesActiveState,
    resetEdgesActiveState,
} from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, onMounted, onUnmounted } from 'vue';
import type { TEdge, TNode } from '@stores/Canvas';

const fileStore = useFileStore();
const vueFlow = inject(vueFlowKey);
const { saveCanvas } = useSaveCanvas();

onMounted(() => {
    window.electron.ipcRenderer.on(
        'fileSavedSuccessfully',
        (_, filePath, fileName) => {
            if (!vueFlow) return;
            const FlowObject = vueFlow.toObject();
            const Contents = {
                edges: resetEdgesActiveState(FlowObject.edges as Array<TEdge>),
                nodes: resetNodesActiveState(FlowObject.nodes as Array<TNode>),
            };

            fileStore.canvasElements = JSON.stringify(Contents);
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
