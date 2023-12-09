<script setup lang="ts">
import VTooltip from '@components/Shared/Tooltips/VTooltip.vue';
</script>
<template>
    <VTooltip placement="top">
        <button class="h-[20px] w-[20px] rounded bg-rose-500 stroke-white p-1" type="button">
            <slot></slot>
        </button>
        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
