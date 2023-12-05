<script setup lang="ts">
import CanvasControls from '@components/Canvas/Partials/Controls.vue';
import CustomNode from '@components/Canvas/Partials/CustomNode.vue';
import { useCanvas } from '@composables/useCanvas';
import { Background } from '@vue-flow/background';
import { VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';

const { onNodeClick, onNodeDrag, onPaneClick, onPaneReady, onMove, tableStore } = useCanvas();
</script>

<template>
    <div class="h-full w-full">
        <VueFlow
            v-model:nodes="tableStore.elements"
            v-model:edges="tableStore.edges"
            :default-edge-options="{ type: 'smoothstep' }"
            :default-viewport="{ zoom: 0.5 }"
            :min-zoom="0.5"
            :max-zoom="1.5"
            :delete-key-code="null"
            @node-click="onNodeClick"
            @node-drag="onNodeDrag"
            @pane-click="onPaneClick"
            @move="onMove"
            @pane-ready="onPaneReady"
        >
            <Background pattern-color="#6381b8" />
            <MiniMap />
            <CanvasControls />
            <template #node-custom="props">
                <CustomNode v-bind="props" :data="props.data" />
            </template>
        </VueFlow>
    </div>
</template>
