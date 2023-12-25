<script setup lang="ts">
export type TProps = {
    isActive?: boolean;
};

const props = defineProps<TProps>();
</script>
<template>
    <button
        class="group flex w-full rounded px-2 py-2 font-neon-mono text-[.6rem] font-semibold outline-none"
        type="button"
        :class="{
            'bg-cyan-600 dark:bg-cyan-950/50 dark:hover:bg-cyan-900/40 dark:focus:bg-cyan-900/40':
                props.isActive,
            'bg-dark-50/25 hover:bg-dark-50/40 dark:bg-dark-800/80 dark:hover:bg-dark-800/50 dark:focus:bg-dark-800/50':
                !props.isActive,
        }"
    >
        <span
            class="w-full max-w-[100px] flex-grow truncate text-left"
            :class="{
                'text-cyan-50 dark:text-cyan-500': props.isActive,
                'text-slate-700 dark:text-slate-400': !props.isActive,
            }"
        >
            <slot name="column"></slot>
        </span>
        <span
            class="w-full flex-grow"
            :class="{
                'text-cyan-50 dark:text-cyan-500 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500':
                    props.isActive,
                'text-slate-500 dark:text-slate-600': !props.isActive,
            }"
        >
            <slot name="type"></slot>
        </span>
        <span
            class="w-full flex-grow"
            :class="{
                'text-cyan-600 dark:text-cyan-500': !props.isActive,
                'text-cyan-50': props.isActive,
            }"
        >
            <slot name="keyConstraint"></slot>
        </span>
    </button>
</template>
