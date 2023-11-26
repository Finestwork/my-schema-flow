<script setup lang="ts">
import { useTableStore } from '@stores/TableStore';
import type { TTableColumn } from '@stores/TableStore';
import { computed } from 'vue';

const TableStore = useTableStore();

const columns = computed((): null | TTableColumn[] => {
    const Columns = TableStore.currentActiveNode.data.table.columns;
    return Columns.sort((a, b) => {
        if (a.keyConstraint === b.keyConstraint) {
            return 0;
        }
        if (a.keyConstraint === 'PK') {
            return -1;
        }
        if (a.keyConstraint === 'FK') {
            return b.keyConstraint === null ? -1 : 1;
        }
        return 1;
    });
});
</script>
<template>
    <div class="mt-6">
        <button
            type="button"
            class="mb-2 flex w-full justify-between rounded-md p-2 text-xs font-semibold outline-none last-of-type:mb-0 dark:bg-dark-500/20 dark:text-slate-200 dark:hover:bg-dark-500/40"
            v-for="(column, ind) in columns"
        >
            <span class="w-full grow truncate text-center text-blue-400">{{ column.name }}</span>
            <span class="w-full grow truncate text-center">{{ column.type }}</span>
            <span class="w-full grow truncate text-center">{{
                column.isNull ? 'Null' : 'Not Null'
            }}</span>
            <span class="w-full grow truncate text-center text-rose-500">{{
                column.keyConstraint
            }}</span>
        </button>
    </div>
</template>
