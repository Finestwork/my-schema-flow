<script setup lang="ts">
import CanvasControls from '@components/Canvas/Partials/Controls.vue';
import CustomNode from '@components/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Canvas/Partials/CustomNodePlaceholder.vue';
import { useCanvas } from '@composables/useCanvas';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { VueFlow } from '@vue-flow/core';
import { ref } from 'vue';

const tablePlaceholder = ref();
const minimap = ref();

const {
    tableStore,
    settingsStore,
    getCanvasClass,
    shouldHidePlaceholder,
    onNodeClick,
    onNodeDrag,
    onPaneMouseMove,
    onPaneMouseEnter,
    onPaneMouseLeave,
    onPaneClick,
    onPaneReady,
    onMove,
    onViewportChangeEnd,
} = useCanvas(tablePlaceholder, minimap);
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
            @node-click="onNodeClick"
            @node-drag="onNodeDrag"
            @move="onMove"
            @pane-click="onPaneClick"
            @pane-ready="onPaneReady"
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
