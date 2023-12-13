<script setup lang="ts">
import { useTableRelation } from '@composables/useTableRelation';
import { getActiveEdges } from '@utilities/NodeEdgeHelper';
import { computed } from 'vue';

const { tableStore } = useTableRelation();
const getAllEdges = computed(() => {
    const ActiveNode = tableStore.currentActiveNode;
    const CurrentTable = ActiveNode.data.table.name;
    const currentActiveEdges = getActiveEdges(ActiveNode, tableStore.edges);
    return currentActiveEdges
        .map((edge) => {
            const IsCurrentNodeParent =
                edge.data.referenced.table === CurrentTable;
            const Table = IsCurrentNodeParent
                ? edge.data.referencing.table
                : edge.data.referenced.table;
            return {
                id: edge.id,
                table: Table,
                column: edge.data.referencing.column,
                isCurrentNodeParent: IsCurrentNodeParent,
            };
        })
        .sort((edge) => {
            return edge.isCurrentNodeParent ? 1 : -1;
        });
});
const onClickUpdateEdge = (edgeIndex: string) => {
    const currentActiveEdges = getActiveEdges(
        tableStore.currentActiveNode,
        tableStore.edges,
    );
    const Index = currentActiveEdges.findIndex((edge) => edge.id === edgeIndex);
    tableStore.currentActiveEdgeIndex = Index;
};
</script>

<template>
    <div class="mb-5 mt-3">
        <button
            v-for="edge in getAllEdges"
            :key="edge.id"
            class="mb-2 flex w-full justify-between rounded-md p-2 text-xs font-semibold outline-none last-of-type:mb-0 dark:bg-dark-500/20 dark:text-slate-200 dark:hover:bg-dark-500/40"
            type="button"
            @dblclick="onClickUpdateEdge(edge.id)"
        >
            <span class="w-4/12 truncate text-left">{{ edge.table }}</span>
            <span class="mx-2 w-4/12 truncate text-left">{{
                edge.column
            }}</span>
            <span class="w-2/12 truncate text-rose-500">{{
                edge.isCurrentNodeParent ? 'Child' : 'Parent'
            }}</span>
        </button>
    </div>
</template>
