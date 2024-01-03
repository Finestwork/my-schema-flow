<script setup lang="ts">
type TProps = {
    isActive: boolean;
};

const props = defineProps<TProps>();
</script>
<template>
    <button
        type="button"
        class="w-full rounded-md p-2 text-left text-xs font-bold outline-none"
        :class="{
            'text-slate-900 hover:bg-slate-200 focus-visible:bg-slate-200 dark:text-slate-400 dark:hover:bg-dark-800/90 dark:focus-visible:bg-dark-800/90':
                !props.isActive,
            'bg-cyan-100 text-cyan-600 hover:bg-cyan-200/70 focus-visible:bg-cyan-200/70 dark:bg-cyan-900/20 dark:hover:bg-cyan-900/30 dark:focus-visible:bg-cyan-900/30':
                props.isActive,
        }"
    >
        <slot></slot>
    </button>
</template>
