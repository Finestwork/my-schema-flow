<script setup lang="ts">
import { TestNodes, TestEdges } from '@renderer/dummy/CanvasDummy'; // Delete this in production
import CustomNode from '@components/Modules/Canvas/Partials/CustomNode.vue';
import Controls from '@components/Modules/Canvas/Partials/Controls.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useNodeDragEvent } from '@composables/useNodeDragEvent';
import { useSortTableColumn } from '@composables/useSortTableColumn';
import { useCalculateEdgePosition } from '@composables/useCalculateEdgePosition';
import { nodeAutolayout } from '@utilities/CanvasHelper';
import { VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Background } from '@vue-flow/background';
import { useVueFlow } from '@vue-flow/core';

const testElements = TestNodes;
const testEdges = TestEdges;
const settingsStore = useSettingsStore();
const {
    getNodes,
    getEdges,
    setNodes,
    setEdges,
    toObject,
    onPaneReady,
    onViewportChangeEnd,
} = useVueFlow();
const { calculateAllEdgesPosition } = useCalculateEdgePosition();

useNodeDragEvent();
useSortTableColumn();
onPaneReady(() => {
    const { nodes, edges } = nodeAutolayout(
        getNodes.value,
        getEdges.value,
        settingsStore.currentOrientation,
    );
    setNodes(() => nodes);
    setEdges(() => edges);
    calculateAllEdgesPosition();
});
onViewportChangeEnd(() => {
    const { viewport } = toObject();
    settingsStore.zoomLevel = +viewport.zoom.toFixed(1);
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
        >
            <Background class="h-full" pattern-color="#6381b8" />
            <MiniMap ref="minimap" pannable zoomable />
            <span
                class="absolute left-2 top-2 z-50 text-xs font-semibold text-slate-300"
                >{{ settingsStore.getZoomLevelInPercentage }}%</span
            >

            <Controls />
            <template #node-custom="props">
                <CustomNode
                    v-bind="props"
                    :id="props.id"
                    :data="props.data"
                    :is-creating-table="false"
                />
            </template>
        </VueFlow>
    </div>
</template>
