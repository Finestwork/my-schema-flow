<script setup lang="ts">
import { useTableStore } from '@stores/TableStore';
import { computed } from 'vue';

const tableStore = useTableStore();
const getAllEdges = computed(() => {
    const ActiveNode = tableStore.currentActiveNode;
    const CurrentTable = ActiveNode.data.table.name;
    return tableStore.currentActiveEdges
        .map((edge) => {
            const IsCurrentNodeParent = edge.data.referenced.table === CurrentTable;
            const Table = IsCurrentNodeParent
                ? edge.data.referencing.table
                : edge.data.referenced.table;
            return {
                table: Table,
                column: IsCurrentNodeParent
                    ? edge.data.referenced.column
                    : edge.data.referencing.column,
                isCurrentNodeParent: IsCurrentNodeParent,
            };
        })
        .filter((edge) => edge);
});
</script>
<template>
    <div class="mb-5 mt-3">
        <button
            class="mb-2 flex w-full justify-between rounded-md p-2 text-xs font-semibold outline-none last-of-type:mb-0 dark:bg-dark-500/20 dark:text-slate-200 dark:hover:bg-dark-500/40"
            type="button"
            v-for="edge in getAllEdges"
        >
            <span class="w-4/12 truncate text-left">{{ edge.table }}</span>
            <span class="mx-2 w-4/12 truncate text-left">{{ edge.column }}</span>
            <span class="w-2/12 truncate text-rose-500">{{
                edge.isCurrentNodeParent ? 'Child' : 'Parent'
            }}</span>
        </button>
    </div>
</template>
