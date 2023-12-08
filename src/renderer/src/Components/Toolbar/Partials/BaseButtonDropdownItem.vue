<script setup lang="ts">
export type TButtonDropdownItem = {
    isActive?: boolean;
};
const props = withDefaults(defineProps<TButtonDropdownItem>(), {
    isActive: false,
});
</script>
<template>
    <button
        class="group flex w-full items-center px-1.5 py-2 outline-none"
        type="button"
        :class="{
            'dark:bg-blue-950/90': props.isActive,
            'dark:hover:bg-blue-900/30 dark:focus:bg-blue-900/30': !props.isActive,
        }"
    >
        <span
            v-if="$slots.icon"
            class="mr-2 w-[12px] shrink-0"
            :class="{
                'dark:stroke-dark-300 group-hover:dark:stroke-blue-500/80 group-focus:dark:stroke-blue-500/80':
                    !props.isActive,
                'dark:stroke-blue-500': props.isActive,
            }"
        >
            <slot name="icon"></slot>
        </span>
        <span
            class="whitespace-nowrap text-xs font-semibold"
            :class="{
                'dark:text-blue-500': props.isActive,
                'dark:text-dark-300 group-hover:dark:text-blue-500/80 group-focus:dark:text-blue-500/80':
                    !props.isActive,
            }"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
