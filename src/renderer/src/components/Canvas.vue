<script setup lang="ts">
import BaseTableNode from '@components/BaseTableNode.vue';
import CanvasControls from '@components/CanvasControls.vue';
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
                <BaseTableNode v-bind="props" :data="props.data" />
            </template>
        </VueFlow>
    </div>
</template>
