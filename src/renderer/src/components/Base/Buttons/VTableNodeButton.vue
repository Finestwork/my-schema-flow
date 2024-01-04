<script setup lang="ts">
export type TProps = {
    isDefault: boolean;
    isFaded: boolean;
    shouldHighlight: boolean;
    isSelected: boolean;
    isTableSelected: boolean;
};

const props = defineProps<TProps>();
</script>
<template>
    <button
        type="button"
        class="flex w-full justify-between px-3 py-3 text-left text-sm font-bold outline-none"
        :class="{
            'bg-slate-500 dark:bg-cyan-950/50': props.shouldHighlight,
            'group hover:bg-cyan-500 hover:dark:bg-cyan-950/50':
                !props.shouldHighlight && !props.isFaded && isTableSelected,
            'bg-cyan-500 dark:bg-cyan-950/50': props.isSelected,
        }"
    >
        <span
            class="mr-2 w-4/12 grow truncate"
            :class="{
                'text-slate-800 group-hover:text-cyan-50 dark:text-slate-400 group-hover:dark:text-cyan-500':
                    props.isDefault && !props.isSelected,
                'text-slate-600/40 dark:text-slate-700/50':
                    props.isFaded && !props.isSelected,
                'text-slate-100 dark:text-cyan-500':
                    props.shouldHighlight || props.isSelected,
            }"
            ><slot name="name"></slot
        ></span>
        <span
            class="w-4/12 grow truncate text-left"
            :class="{
                'text-slate-500 group-hover:text-cyan-50 dark:text-slate-600 group-hover:dark:text-cyan-500':
                    props.isDefault && !props.isSelected,
                'text-slate-400/50 dark:text-slate-700/50':
                    props.isFaded && !props.isSelected,
                'text-slate-100  dark:text-cyan-500':
                    props.shouldHighlight || props.isSelected,
            }"
        >
            <slot name="type"></slot>
        </span>
        <span
            class="w-2/12 grow truncate text-center"
            :class="{
                'text-cyan-500 group-hover:text-cyan-50 group-hover:dark:text-cyan-500':
                    !props.isFaded &&
                    !props.shouldHighlight &&
                    !props.isSelected,
                'text-slate-700/50': props.isFaded && !props.isSelected,
                'text-slate-100  dark:text-cyan-500':
                    props.shouldHighlight || props.isSelected,
            }"
        >
            <slot name="keyConstraint"></slot>
        </span>
    </button>
</template>
