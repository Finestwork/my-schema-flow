<script setup lang="ts">
import { TestNodes, TestEdges } from '@dummy/CanvasDummy'; // Delete this in production
import CustomNode from '@components/Modules/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Modules/Canvas/Partials/CustomNodePlaceholder.vue';
import Controls from '@components/Modules/Canvas/Partials/Controls.vue';
import ZoomText from '@components/Modules/Canvas/Partials/ZoomText.vue';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { VueFlow } from '@vue-flow/core';

const testElements = TestNodes;
const testEdges = TestEdges;
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
            <ZoomText />

            <Controls />
            <CustomNodePlaceholder ref="placeholder" />
            <template #node-custom="props">
                <CustomNode v-bind="props" />
            </template>
        </VueFlow>
    </div>
</template>
