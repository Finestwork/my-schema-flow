<script setup lang="ts">
import { TestNodes, TestEdges } from '@renderer/dummy/CanvasDummy'; // Delete this in production
import CustomNode from '@components/modules/canvas/partials/CustomNode.vue';
import { VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Background } from '@vue-flow/background';

const testElements = TestNodes;
const testEdges = TestEdges;
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
            >100%</span
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
