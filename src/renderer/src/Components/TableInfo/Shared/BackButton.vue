<script setup lang="ts">
import VBackArrowIcon from '@components/Shared/Icons/VBackArrowIcon.vue';
</script>
<template>
    <button
        class="flex items-center rounded-md px-3 py-2 outline-none dark:bg-dark-600/50 dark:stroke-slate-300 dark:hover:bg-dark-600/60 dark:focus:bg-dark-600/60"
        type="button"
    >
        <span class="mr-2 block w-[12px]">
            <VBackArrowIcon />
        </span>

        <span class="text-xs font-semibold dark:text-slate-300">Go back</span>
    </button>
</template>
