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
const vueFlowComponent = ref();
const currentZoom = ref(0.5);

const {
    tableStore,
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
} = useCanvas(tablePlaceholder);
</script>

<template>
    <div class="relative">
        <VueFlow
            ref="vueFlowComponent"
            v-model:nodes="tableStore.elements"
            v-model:edges="tableStore.edges"
            :class="getCanvasClass"
            :default-edge-options="{ type: 'smoothstep' }"
            :default-viewport="{ zoom: currentZoom }"
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
        >
            <Background class="h-full" pattern-color="#6381b8" />
            <MiniMap pannable zoomable />
            <CanvasControls v-model:current-zoom="currentZoom" />
            <span class="absolute left-2 top-2 text-xs font-semibold text-slate-500"
                >{{ currentZoom * 100 }}%</span
            >
            <template #node-custom="props">
                <CustomNode v-bind="props" :data="props.data" :id="props.id" />
            </template>
            <CustomNodePlaceholder
                ref="tablePlaceholder"
                class="absolute"
                :should-hide="shouldHidePlaceholder"
            />
        </VueFlow>
    </div>
</template>
