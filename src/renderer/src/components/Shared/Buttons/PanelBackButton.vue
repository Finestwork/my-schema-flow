<script setup lang="ts">
import BackArrowIcon from '@components/Shared/Icons/BackArrowIcon.vue';

const emits = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();
</script>
<template>
    <button
        class="flex items-center rounded-md bg-slate-300 px-3 py-2 outline-none hover:bg-slate-500/20 focus:bg-slate-500/20 dark:bg-dark-600/50 dark:hover:bg-dark-600/60 dark:focus:bg-dark-600/60"
        type="button"
        @click="emits('click', $event)"
    >
        <span
            class="mr-2 block w-[12px] stroke-slate-500 dark:stroke-slate-300"
        >
            <BackArrowIcon />
        </span>

        <span class="text-xs font-semibold text-slate-500 dark:text-slate-300"
            >Go back</span
        >
    </button>
</template>
