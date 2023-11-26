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
    <div class="h-[250px] w-[200px] border-slate-100 border-2 bg-white rounded-lg overflow-hidden">
        <span class="bg-rose-500 block text-xs font-semibold text-center text-white py-2">{{
            Props.label
        }}</span>
    </div>
</template>
