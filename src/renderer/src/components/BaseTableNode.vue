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
        class="relative h-[150px] w-[200px] overflow-hidden rounded-lg border-2 border-blue-500 bg-white pt-1.5"
    >
        <span class="absolute left-0 top-0 block h-[6px] w-full bg-blue-500"> </span>
        <span class="block bg-blue-50 py-1 text-center text-xs font-semibold text-blue-500">{{
            Props.data.table.name
        }}</span>
    </div>
</template>
