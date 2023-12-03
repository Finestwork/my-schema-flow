<script setup lang="ts">
import BaseTableNode from '@components/BaseTableNode.vue';
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { useTableRelation } from '@composables/useTableRelation';
import { sortConstraintKeys } from '@renderer/utils/TableColumnHelper';
import { calculateEdgePosition } from '@renderer/utils/NodeEdgeHelper';
import { nodeAutolayout } from '@renderer/utils/NodeHelper';
import { useDebounceFn } from '@vueuse/core';

const { tableStore, currentActiveEdges } = useTableRelation();
const onNodeClick = (event) => {
    tableStore.currentActiveNode = { ...event.node };
};
const onNodeDrag = useDebounceFn((event) => {
    tableStore.currentActiveNode = { ...event.node };
    currentActiveEdges.value.forEach(calculateEdgePosition);
}, 150);
const onPaneClick = () => {
    tableStore.currentActiveNode = {};
    tableStore.currentActiveEdges = [];
    if (tableStore.currentActiveEdgeIndex !== -1) {
        tableStore.currentActiveEdgeIndex = -1;
    }
};
const onMove = () => {
    tableStore.currentActiveNode = {};
    tableStore.currentActiveEdges = [];
    if (tableStore.currentActiveEdgeIndex !== -1) {
        tableStore.currentActiveEdgeIndex = -1;
    }
};

const onPaneReady = () => {
    tableStore.elements = tableStore.elements.map((element) => {
        const Columns = element.data.table.columns;
        element.data.table.columns = sortConstraintKeys(Columns);
        return element;
    });
    const { nodes, edges } = nodeAutolayout(tableStore.elements, tableStore.edges);
    tableStore.elements = nodes;
    tableStore.edges = edges;
    tableStore.edges.forEach(calculateEdgePosition);
};
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
            <Controls />
            <template #node-custom="props">
                <BaseTableNode v-bind="props" :data="props.data" />
            </template>
        </VueFlow>
    </div>
</template>
