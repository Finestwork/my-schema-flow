<script setup lang="ts">
import { TestNodes, TestEdges } from '@dummy/CanvasDummy'; // Delete this in production
import CustomNode from '@components/Modules/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Modules/Canvas/Partials/CustomNodePlaceholder.vue';
import Controls from '@components/Modules/Canvas/Partials/Controls.vue';
import ZoomText from '@components/Modules/Canvas/Partials/ZoomText.vue';
import { useSettingsStore } from '@stores/Settings';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
import { useNodeDragEvent } from '@composables/Nodes/useNodeDragEvent';
import { useEdgeEvents } from '@composables/Edges/useEdgeEvent';
import { useSortTableColumns } from '@composables/Table/useSortTableColumns';
import { useMinimap } from '@composables/Canvas/useMinimap';
import { useKeyboardShortcuts } from '@composables/Miscellaneous/useKeyboardShortcuts';
import { useIPCListeners } from '@composables/Miscellaneous/useIPCListeners';
import { usePaneDoubleClick } from '@composables/Canvas/usePaneDoubleClick';
import { useCanvasControls } from '@composables/Canvas/useCanvasControls';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { nextTick, computed } from 'vue';

const testElements = TestNodes;
const testEdges = TestEdges;
const settingsStore = useSettingsStore();
const getPatternColor = computed(() => {
    return settingsStore.isDarkMode ? '#6381b8' : '#334155';
});
const { createHistory } = useHistoryActions();
const { autoLayout } = useNodeAutoLayout();
const { sortPrimaryKey } = useSortTableColumns();
const { onPaneReady, onViewportChangeEnd, getViewport } = useVueFlow();
const { zoomOut } = useCanvasControls();
useNodeDragEvent();
useMinimap();
useEdgeEvents();
useKeyboardShortcuts();
useIPCListeners();
onPaneReady(async () => {
    sortPrimaryKey();
    autoLayout();
    await nextTick();
    createHistory('Initial Load');
});
onViewportChangeEnd(() => {
    const ZoomLevel = getViewport().zoom;
    settingsStore.zoomLevel = +ZoomLevel.toFixed(1);
});
usePaneDoubleClick(() => {
    if (settingsStore.zoomLevel >= 1) {
        setTimeout(() => {
            zoomOut(0.5);
        }, 250);
    }
});
</script>

<template>
    <div class="relative h-full">
        <VueFlow
            v-model:nodes="testElements"
            v-model:edges="testEdges"
            :default-edge-options="{
                type: 'smoothstep',
            }"
            :default-viewport="{
                zoom: 0.5,
            }"
            :min-zoom="0.1"
            :max-zoom="1"
            :delete-key-code="null"
            :nodes-focusable="false"
        >
            <Background class="h-full" :pattern-color="getPatternColor" />
            <MiniMap ref="minimap" pannable zoomable />
            <ZoomText />

            <Controls />
            <CustomNodePlaceholder ref="placeholder" />
            <template #node-custom="props">
                <CustomNode :id="props.id" :data="props.data" />
            </template>
        </VueFlow>
    </div>
</template>
