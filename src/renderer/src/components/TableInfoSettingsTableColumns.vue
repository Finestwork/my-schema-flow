<script setup lang="ts">
import type { TTableColumn } from '@stores/TableStore';
import { useTableStore } from '@stores/TableStore';
import { computed, ref } from 'vue';

const TableStore = useTableStore();
const buttonColumns = ref();
const { currentIndex } = defineModels<{
    currentIndex: number;
}>();
const columns = computed((): null | TTableColumn[] => {
    const Columns = TableStore?.currentActiveNode?.data?.table?.columns ?? [];
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
const onClickRemoveActiveState = (e: MouseEvent) => {
    const Target = <HTMLElement>e.target;
    currentIndex.value = buttonColumns.value.findIndex((btn) => btn.contains(Target));
};
</script>
<template>
    <div class="mt-6" @click="onClickRemoveActiveState">
        <button
            ref="buttonColumns"
            type="button"
            class="mb-2 flex w-full justify-between rounded-md p-2 text-xs font-semibold outline-none last-of-type:mb-0"
            v-for="(column, index) in columns"
            :key="column.id"
            :class="{
                'dark:bg-dark-500/20 dark:text-slate-200 dark:hover:bg-dark-500/40':
                    currentIndex !== index,
                'dark:hover:bg-dark-blue-500/40 dark:bg-blue-500/20 dark:text-blue-500':
                    currentIndex === index,
            }"
        >
            <span
                class="w-full grow truncate text-left"
                :class="{
                    'dark:text-blue-400': currentIndex !== index,
                    'dark:text-blue-500': currentIndex === index,
                }"
                >{{ column.name }}</span
            >
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
