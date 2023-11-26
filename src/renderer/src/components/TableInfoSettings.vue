<script setup lang="ts">
import IconChevron from '@components/IconChevron.vue';
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import { useTableStore } from '@stores/TableStore';

const TableStore = useTableStore();
</script>

<template>
    <TableInfoSectionWrapper :show-forms="TableStore.hasActiveNode">
        <template #icon>
            <IconChevron />
        </template>
        <template #forms>
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
                v-model="TableStore.currentActiveNode.data.table.name"
            />
        </template>
    </TableInfoSectionWrapper>
</template>
