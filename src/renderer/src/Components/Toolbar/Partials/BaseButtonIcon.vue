<script setup lang="ts">
import VTooltip from '@components/Shared/Tooltips/VTooltip.vue';
</script>
<template>
    <VTooltip>
        <button
            type="button"
            class="flex h-[25px] w-[25px] rounded p-1.5 outline-none dark:bg-dark-600 dark:stroke-slate-400 dark:hover:bg-blue-950/60 hover:dark:stroke-blue-500 dark:focus:bg-blue-950/60 focus:dark:stroke-blue-500"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
