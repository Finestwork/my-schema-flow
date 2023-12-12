<script setup lang="ts">
import CanvasControls from '@components/Canvas/Partials/Controls.vue';
import CustomNode from '@components/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Canvas/Partials/CustomNodePlaceholder.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useAutoLayout } from '@composables/useAutoLayout';
import { useNodeCanvasEvents } from '@composables/useNodeCanvasEvents';
import { useWatchHistory } from '@composables/useWatchHistory';
import { useCanvas } from '@composables/useCanvas';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const tablePlaceholder = ref();
const minimap = ref();
const { currentNodeOrientation } = storeToRefs(useSettingsStore());
const { runAutoLayout } = useAutoLayout(currentNodeOrientation);
const { onPaneReady } = useVueFlow();

const {
    tableStore,
    settingsStore,
    getCanvasClass,
    shouldHidePlaceholder,
    onPaneMouseMove,
    onPaneMouseEnter,
    onPaneMouseLeave,
    onPaneClick,
    onPaneReady: onCanvasReady,
    onMove,
    onViewportChangeEnd,
} = useCanvas(tablePlaceholder);
useNodeCanvasEvents(minimap);
useWatchHistory(minimap);
onPaneReady(() => {
    runAutoLayout();
});
</script>

<template>
    <div class="relative">
        <VueFlow
            v-model:nodes="tableStore.elements"
            v-model:edges="tableStore.edges"
            :class="getCanvasClass"
            :default-edge-options="{ type: 'smoothstep' }"
            :default-viewport="{ zoom: settingsStore.zoomLevel }"
            :min-zoom="0.1"
            :max-zoom="1"
            :delete-key-code="null"
            @move="onMove"
            @pane-click="onPaneClick"
            @pane-ready="onCanvasReady"
            @pane-mouse-enter="onPaneMouseEnter"
            @pane-mouse-move="onPaneMouseMove"
            @pane-mouse-leave="onPaneMouseLeave"
            @viewport-change-end="onViewportChangeEnd"
        >
            <Background class="h-full" pattern-color="#6381b8" />
            <MiniMap ref="minimap" pannable zoomable />
            <CanvasControls />
            <span class="absolute left-2 top-2 text-xs font-semibold text-slate-500"
                >{{ settingsStore.zoomLevel * 100 }}%</span
            >
            <template #node-custom="props">
                <CustomNode v-bind="props" :id="props.id" :data="props.data" />
            </template>
            <CustomNodePlaceholder
                ref="tablePlaceholder"
                class="absolute"
                :should-hide="shouldHidePlaceholder"
            />
        </VueFlow>
    </div>
</template>
