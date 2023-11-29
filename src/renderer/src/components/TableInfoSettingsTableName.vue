<script setup lang="ts">
import { useTableStore } from '@stores/TableStore';
import { computed } from 'vue';

const TableStore = useTableStore();
const tableName = computed({
    set(value: string) {
        if (!TableStore.currentActiveNode) return;
        TableStore.currentActiveNode.data.table.name = value;
    },
    get() {
        return TableStore?.currentActiveNode?.data?.table?.name ?? '';
    },
});
</script>
<template>
    <label
        class="mb-2 inline-flex cursor-pointer text-xs font-medium dark:text-slate-300"
        for="tableSettingsTableName"
    >
        Table Name:
    </label>
    <input
        class="block w-full rounded-sm border-2 bg-transparent px-1.5 py-1.5 text-xs font-semibold outline-none transition-shadow duration-300 focus:ring-4 focus:ring-blue-500/60 dark:border-slate-300 dark:text-slate-300 dark:focus:border-blue-300"
        type="text"
        placeholder="Place table name here"
        id="tableSettingsTableName"
        v-model="tableName"
    />
</template>
