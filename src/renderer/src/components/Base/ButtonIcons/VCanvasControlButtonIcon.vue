<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';

export type TProps = {
    disabled?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
    disabled: false,
});
</script>

<template>
    <VTooltip :offset-y="8">
        <button
            class="h-[28px] w-[28px] p-2 outline-none"
            type="button"
            :class="{
                'cursor-not-allowed bg-slate-100 dark:bg-dark-850':
                    props.disabled,
                'group bg-slate-200 hover:bg-cyan-500 dark:bg-dark-800 dark:hover:bg-cyan-950':
                    !props.disabled,
            }"
            :disabled="props.disabled"
        >
            <span
                :class="{
                    'stroke-slate-400 dark:stroke-dark-500': props.disabled,
                    'stroke-slate-600 group-hover:stroke-white dark:stroke-dark-300':
                        !props.disabled,
                }"
            >
                <slot></slot>
            </span>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
