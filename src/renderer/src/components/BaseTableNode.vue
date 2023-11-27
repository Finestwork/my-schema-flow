<script setup lang="ts">
import { Handle } from '@vue-flow/core';
import type { TTableData } from '@stores/TableStore';
import type { PropType } from 'vue';

const Props = defineProps({
    data: {
        type: Object as PropType<TTableData>,
        required: true,
    },
});
</script>

<template>
    <div
        class="relative min-h-[150px] w-[250px] overflow-hidden rounded-lg border-2 border-blue-500 bg-white pt-1.5 font-jetbrains"
    >
        <span class="absolute left-0 top-0 block h-[6px] w-full bg-blue-500"> </span>
        <span class="block bg-blue-50 py-1 text-center text-sm font-semibold text-blue-500">{{
            Props.data.table.name
        }}</span>
        <div
            class="flex justify-between px-2 py-2 text-sm font-medium"
            v-for="column in Props.data.table.columns"
        >
            <span class="w-full grow truncate text-slate-500">{{ column.name }}</span>
            <span class="w-full grow truncate text-center text-slate-500">{{ column.type }}</span>
            <span class="w-full grow truncate text-center text-rose-500">{{
                column.keyConstraint ?? ''
            }}</span>
        </div>
    </div>
</template>
