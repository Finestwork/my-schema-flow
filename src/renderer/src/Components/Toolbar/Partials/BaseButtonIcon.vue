<script setup lang="ts">
import VTooltip from '@components/Shared/Tooltips/VTooltip.vue';

export type TButtonProps = {
    disabled?: boolean;
};
const props = withDefaults(defineProps<TButtonProps>(), {
    disabled: false,
});
</script>
<template>
    <VTooltip :offset-y="4">
        <button
            type="button"
            class="flex h-[25px] w-[25px] rounded p-1.5 outline-none"
            :class="{
                'cursor-not-allowed dark:bg-dark-700 dark:stroke-dark-600': props.disabled,
                'dark:bg-dark-600 dark:stroke-slate-400 dark:hover:bg-blue-950/60 hover:dark:stroke-blue-500 dark:focus:bg-blue-950/60 focus:dark:stroke-blue-500':
                    !props.disabled,
            }"
            :disabled="props.disabled"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
