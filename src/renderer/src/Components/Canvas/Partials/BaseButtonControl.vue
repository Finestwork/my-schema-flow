<script setup lang="ts">
import VTooltip from '@components/Shared/Tooltips/VTooltip.vue';

export type TProps = {
    disabled?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
    disabled: false,
});
</script>
<template>
    <VTooltip>
        <button
            class="h-[28px] w-[28px] p-2 outline-none"
            type="button"
            :class="{
                'cursor-not-allowed dark:bg-dark-800': props.disabled,
                'group dark:bg-dark-700 dark:hover:bg-blue-600':
                    !props.disabled,
            }"
            :disabled="props.disabled"
        >
            <span
                :class="{
                    'dark:stroke-slate-600': props.disabled,
                    'dark:stroke-slate-500 group-hover:dark:stroke-white':
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
