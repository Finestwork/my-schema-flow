<script setup lang="ts">
export type TProps = {
    isActive: boolean;
    isDefault: boolean;
    isFaded: boolean;
};

const props = defineProps<TProps>();
</script>
<template>
    <div
        class="min-h-[150px] w-[350px] overflow-hidden rounded-lg border-2 bg-white font-neon-mono hover:cursor-pointer dark:bg-dark-900"
        :class="{
            'border-cyan-500 dark:border-cyan-600': props.isActive,
            'border-slate-300 hover:border-slate-500 dark:border-dark-700 hover:dark:border-cyan-600':
                props.isDefault,
            'border-slate-100 dark:border-dark-800': props.isFaded,
        }"
    >
        <span
            class="block truncate px-1 py-2 text-center text-sm font-bold"
            :class="{
                'bg-cyan-500 text-cyan-50 dark:bg-cyan-950/30 dark:text-cyan-500':
                    props.isActive,
                'bg-slate-200 text-slate-800 dark:bg-dark-800 dark:text-dark-100':
                    props.isDefault,
                'bg-slate-100 text-slate-300 dark:bg-dark-800/40 dark:text-dark-700':
                    props.isFaded,
            }"
        >
            <slot name="tableName"></slot>
        </span>
        <slot></slot>
    </div>
</template>
