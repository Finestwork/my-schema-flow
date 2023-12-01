<script setup lang="ts">
import BaseTableNode from '@components/BaseTableNode.vue';
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { useTableStore } from '@stores/TableStore';

const tableStore = useTableStore();
const onNodeClick = (event) => {
    tableStore.currentActiveNode = { ...event.node };
    if(tableStore.currentActiveEdges.length === 0){
        tableStore.currentActiveEdges = event.connectedEdges.slice();
    }
};
const onNodeDrag = (event) => {
    tableStore.currentActiveNode = { ...event.node };
    if(tableStore.currentActiveEdges.length === 0){
        tableStore.currentActiveEdges = tableStore.edges.filter(
            (edge) => edge.source === event.node.id || edge.target === event.node.id,
        );
    }
};
const onPaneClick = () => {
    tableStore.currentActiveNode = {};
    tableStore.currentActiveEdges = [];
};
const onMove = () => {
    tableStore.currentActiveNode = {};
    tableStore.currentActiveEdges = [];
};
</script>

<template>
    <div class="h-full w-full">
        <VueFlow
            v-model:nodes="tableStore.elements"
            v-model:edges="tableStore.edges"
            :default-edge-options="{ type: 'smoothstep', animated: true }"
            :default-viewport="{ zoom: 0.5 }"
            :max-zoom="1.5"
            :delete-key-code="null"
            @node-click="onNodeClick"
            @node-drag="onNodeDrag"
            @pane-click="onPaneClick"
            @move="onMove"
        >
            <Background pattern-color="#6381b8" />
            <MiniMap />
            <Controls />
            <template #node-custom="props">
                <BaseTableNode v-bind="props" :data="props.data" />
            </template>
        </VueFlow>
    </div>
</template>
