<script setup lang="ts">
import { TestNodes, TestEdges } from '@renderer/dummy/CanvasDummy'; // Delete this in production
import CustomNode from '@components/Modules/Canvas/Partials/CustomNode.vue';
import Controls from '@components/Modules/Canvas/Partials/Controls.vue';
import CustomNodePlaceholder from '@components/Modules/Canvas/Partials/CustomNodePlaceholder.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useNodeDragEvents } from '@composables/useNodeDragEvents';
import { useEdgeEvents } from '@composables/useEdgeEvents';
import { useSortTableColumn } from '@composables/useSortTableColumn';
import { useNodeAutoLayout } from '@composables/useNodeAutoLayout';
import { useMinimap } from '@composables/useMinimap';
import { useHistory } from '@composables/useHistory';
import { VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Background } from '@vue-flow/background';
import { useVueFlow } from '@vue-flow/core';
import { nextTick, ref } from 'vue';

const testElements = TestNodes;
const testEdges = TestEdges;
const settingsStore = useSettingsStore();
const minimap = ref();
const placeholder = ref();
const { createHistory } = useHistory();
const { toObject, onPaneReady, onViewportChangeEnd } = useVueFlow();
const { autoLayout } = useNodeAutoLayout();

useNodeDragEvents();
useEdgeEvents();
useSortTableColumn();
useMinimap(minimap);
onPaneReady(async () => {
    autoLayout();
    await nextTick();
    createHistory('Initial Load');
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
            :nodes-focusable="false"
        >
            <Background class="h-full" pattern-color="#6381b8" />
            <MiniMap ref="minimap" pannable zoomable />
            <span
                class="absolute left-2 top-2 z-50 text-xs font-semibold text-slate-300"
                >{{ settingsStore.getZoomLevelInPercentage }}%</span
            >

            <Controls />
            <CustomNodePlaceholder ref="placeholder" />
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
