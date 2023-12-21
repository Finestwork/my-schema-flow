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
        class="group flex w-full items-center px-1.5 py-2 outline-none"
        type="button"
        :class="{
            'hover:dark:bg-dark-700/40 focus:dark:bg-dark-700/40':
                !props.isActive,
            'dark:bg-cyan-950/50': props.isActive,
        }"
    >
        <span
            v-if="$slots.icon"
            class="mr-2 block w-[12px]"
            :class="{
                'dark:stroke-slate-300': !props.isActive,
                'stroke-cyan-500': props.isActive,
            }"
        >
            <slot name="icon"></slot>
        </span>
        <span
            v-if="$slots.text"
            class="text-[.6rem]"
            :class="{
                'dark:text-slate-300': !props.isActive,
                'dark:text-cyan-500': props.isActive,
            }"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
