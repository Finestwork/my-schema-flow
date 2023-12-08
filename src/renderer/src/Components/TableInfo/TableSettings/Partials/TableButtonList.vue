<script setup lang="ts">
import { useSortTableColumns } from '@composables/useSortTableColumns';
import { ref } from 'vue';

const { currentIndex } = defineModels<{
    currentIndex: number;
}>();
const emits = defineEmits<{
    (e: 'editColumn', index: number);
}>();
const buttonColumns = ref();
const { sortActiveTableColumns } = useSortTableColumns();
const onClickRemoveActiveState = (e: MouseEvent) => {
    const Target = <HTMLElement>e.target;
    const PreviousValue = currentIndex.value;
    currentIndex.value = buttonColumns.value.findIndex((btn) => btn.contains(Target));
    if (currentIndex.value === PreviousValue) {
        currentIndex.value = -1;
        return;
    }
};
</script>
<template>
    <div class="mt-6" @click="onClickRemoveActiveState">
        <button
            v-for="(column, index) in sortActiveTableColumns"
            ref="buttonColumns"
            :key="column.id"
            type="button"
            class="mb-2 flex w-full justify-between rounded-md p-2 text-xs font-semibold outline-none last-of-type:mb-0"
            :class="{
                'dark:bg-dark-500/20 dark:text-slate-200 dark:hover:bg-dark-500/40':
                    currentIndex !== index,
                'dark:hover:bg-dark-blue-500/40 dark:bg-blue-500/20 dark:text-blue-500':
                    currentIndex === index,
            }"
            @dblclick="emits('editColumn', index)"
        >
            <span
                class="mr-2 w-full grow truncate text-left"
                :class="{
                    'dark:text-blue-400': currentIndex !== index,
                    'dark:text-blue-500': currentIndex === index,
                }"
                >{{ column.name }}</span
            >
            <span class="w-full grow truncate text-left">{{ column.type }}</span>
            <span class="w-full grow truncate text-center">{{
                column.isNull ? 'Null' : 'Not Null'
            }}</span>
            <span class="w-full grow truncate text-center text-rose-500">{{
                column.keyConstraint
            }}</span>
        </button>
    </div>
</template>
