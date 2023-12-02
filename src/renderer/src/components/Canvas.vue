<script setup lang="ts">
import BaseTableNode from '@components/BaseTableNode.vue';
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { useTableStore } from '@stores/TableStore';
import { useDebounceFn } from '@vueuse/core';
import { sortConstraintKeys } from '@renderer/TableColumnHelper';
import { computed } from 'vue';

const tableStore = useTableStore();
const onNodeClick = (event) => {
    tableStore.currentActiveNode = { ...event.node };
};
const onNodeDrag = useDebounceFn((event) => {
    tableStore.currentActiveNode = { ...event.node };
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
const sortedColumns = computed({
    set(elements) {
        tableStore.elements = elements;
    },
    get() {
        return tableStore.elements.map((element) => {
            const Columns = element.data.table.columns;
            element.data.table.columns = sortConstraintKeys(Columns);
            return element;
        });
    },
});
</script>

<template>
    <div class="h-full w-full">
        <VueFlow
            v-model:nodes="sortedColumns"
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
