<script setup lang="ts">
import BaseTableNode from '@components/BaseTableNode.vue';
import BaseTableEdge from '@components/BaseTableEdge.vue';
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
const resetActiveState = () => {
    if (Object.keys(tableStore.currentActiveNode).length !== 0) {
        tableStore.currentActiveNode.data.state = {
            isActive: false,
        };
    }
    currentActiveEdges.value.forEach((edge) => {
        edge.style = {};
        edge.animated = false;
    });
};

const onNodeClick = (event) => {
    resetActiveState();
    tableStore.currentActiveNode = { ...event.node };
    tableStore.currentActiveNode.data.state.isActive = true;
    currentActiveEdges.value.forEach((edge) => {
        edge.style = {
            stroke: '#3b82f6',
        };
        edge.animated = true;
    });
};
const onNodeDrag = useDebounceFn((event) => {
    resetActiveState();
    tableStore.currentActiveNode = { ...event.node };
    tableStore.currentActiveNode.data.state = {
        isActive: true,
    };
    currentActiveEdges.value.forEach(calculateEdgePosition);
}, 150);
const onPaneClick = () => {
    resetActiveState();
    tableStore.currentActiveNode = {};
    tableStore.currentActiveEdges = [];
    if (tableStore.currentActiveEdgeIndex !== -1) {
        tableStore.currentActiveEdgeIndex = -1;
    }
};
const onMove = () => {
    resetActiveState();
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
            <!--            <template #edge-custom="props">-->
            <!--                <BaseTableEdge v-bind="props" />-->
            <!--            </template>-->
        </VueFlow>
    </div>
</template>
