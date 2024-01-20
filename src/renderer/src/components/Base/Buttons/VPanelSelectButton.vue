<script setup lang="ts">
export type TProps = {
    isActive: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    isActive: false,
});
</script>

<template>
    <button
        type="button"
        class="rounded px-1 py-2.5 text-xs font-bold outline-none"
        :class="{
            'bg-slate-300 text-slate-600 hover:bg-slate-400/50 focus:bg-slate-400/50 dark:bg-dark-600/50 dark:text-slate-400 hover:dark:bg-dark-700/70 focus:dark:bg-dark-700/70':
                !props.isActive,
            'bg-cyan-600 text-cyan-50 dark:bg-cyan-950/50 dark:text-cyan-500':
                props.isActive,
        }"
    >
        <slot></slot>
    </button>
</template>
