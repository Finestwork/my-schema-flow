<script setup lang="ts">
import { TestNodes, TestEdges } from '@renderer/dummy/CanvasDummy'; // Delete this in production
import CustomNode from '@components/modules/canvas/partials/CustomNode.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useNodeDragEvent } from '@composables/useNodeDragEvent';
import { nodeAutolayout, calculateEdgePosition } from '@utilities/CanvasHelper';
import { VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Background } from '@vue-flow/background';
import { useVueFlow } from '@vue-flow/core';

const testElements = TestNodes;
const testEdges = TestEdges;
const settingsStore = useSettingsStore();
const { getNodes, getEdges, onPaneReady } = useVueFlow();

useNodeDragEvent();
onPaneReady(() => {
    nodeAutolayout(
        getNodes.value,
        getEdges.value,
        settingsStore.currentOrientation,
    );
    getEdges.value.forEach((edge) => {
        const { sourceHandle, targetHandle } = calculateEdgePosition(edge);
        edge.sourceHandle = sourceHandle;
        edge.targetHandle = targetHandle;
    });
});
</script>

<template>
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
    >
        <Background class="h-full" pattern-color="#6381b8" />
        <MiniMap ref="minimap" pannable zoomable />
        <span class="absolute left-2 top-2 text-xs font-semibold text-slate-500"
            >{{ settingsStore.getZoomLevelInPercentage }}%</span
        >

        <template #node-custom="props">
            <CustomNode
                v-bind="props"
                :id="props.id"
                :data="props.data"
                :is-creating-table="false"
            />
        </template>
    </VueFlow>
</template>
