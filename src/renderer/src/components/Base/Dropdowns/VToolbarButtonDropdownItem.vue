<script setup lang="ts">
export type TProps = {
    isActive?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
    isActive: false,
});
</script>
<template>
    <button
        class="group flex w-full items-center px-1.5 py-2 font-bold outline-none"
        type="button"
        :class="{
            'bg-white hover:bg-slate-200 focus:bg-slate-100 dark:bg-dark-700 hover:dark:bg-dark-700/40 focus:dark:bg-dark-700/40':
                !props.isActive,
            'bg-cyan-500 dark:bg-cyan-950/50': props.isActive,
        }"
    >
        <span
            v-if="$slots.icon"
            class="mr-2 block w-[12px]"
            :class="{
                'stroke-slate-500 dark:stroke-slate-300': !props.isActive,
                'stroke-cyan-50 dark:stroke-cyan-500': props.isActive,
            }"
        >
            <slot name="icon"></slot>
        </span>
        <span
            v-if="$slots.text"
            class="text-[.6rem]"
            :class="{
                'text-slate-500 dark:text-slate-300': !props.isActive,
                'text-cyan-50 dark:text-cyan-500': props.isActive,
            }"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
