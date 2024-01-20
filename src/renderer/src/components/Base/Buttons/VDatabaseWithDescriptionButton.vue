<script setup lang="ts">
export type TProps = {
    isActive: boolean;
};

const props = defineProps<TProps>();
</script>

<template>
    <button
        class="group flex w-full justify-between px-2 py-1.5 text-xs font-bold outline-none"
        type="button"
        :class="{
            'bg-cyan-500 hover:bg-cyan-500 focus:bg-cyan-500 dark:bg-cyan-950 dark:hover:bg-cyan-950 dark:focus:bg-cyan-950':
                props.isActive,
            'hover:bg-slate-200 focus:bg-slate-200 hover:dark:bg-cyan-950 focus:dark:bg-cyan-950':
                !props.isActive,
        }"
    >
        <span
            class="w-full truncate text-left group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
            :class="{
                'text-cyan-50 dark:text-cyan-500': props.isActive,
                'text-slate-800 dark:text-slate-500': !props.isActive,
            }"
            ><slot name="name"></slot
        ></span>
        <span
            v-if="$slots.description"
            class="w-full truncate text-left group-hover:dark:text-cyan-700 group-focus:dark:text-cyan-700"
            :class="{
                'text-cyan-200 dark:text-cyan-700': props.isActive,
                'text-slate-400 dark:text-slate-700': !props.isActive,
            }"
        >
            <slot name="description"></slot>
        </span>
    </button>
</template>
