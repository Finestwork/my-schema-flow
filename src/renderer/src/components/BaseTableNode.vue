<script setup lang="ts">
import { Handle } from '@vue-flow/core';

const Props = defineProps({
    label: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        class="relative h-[150px] w-[200px] border-blue-500 border-2 bg-white pt-1.5 rounded-lg overflow-hidden"
    >
        <span class="bg-blue-500 block w-full h-[6px] absolute top-0 left-0"> </span>
        <span class="text-xs font-semibold text-center text-blue-500 bg-blue-50 py-1 block">{{
            Props.label
        }}</span>
    </div>
</template>
