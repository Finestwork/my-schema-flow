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
        class="w-full rounded px-1 py-2 text-xs font-semibold outline-none"
        :class="{
            'dark:bg-dark-600/50 dark:text-slate-400 hover:dark:bg-dark-700/70 focus:dark:bg-dark-700/70':
                !props.isActive,
            'dark:bg-cyan-950/50 dark:text-cyan-500': props.isActive,
        }"
    >
        <slot></slot>
    </button>
</template>
