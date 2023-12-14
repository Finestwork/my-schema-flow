<script setup lang="ts">
import VTooltip from '@components/Base/Layouts/VTooltip.vue';

export type TProps = {
    disabled?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
    disabled: false,
});
</script>
<template>
    <VTooltip :offset-y="5">
        <button
            class="h-[28px] w-[28px] p-2 outline-none"
            type="button"
            :class="{
                'cursor-not-allowed dark:bg-dark-850': props.disabled,
                'group dark:bg-dark-800 dark:hover:bg-cyan-950':
                    !props.disabled,
            }"
            :disabled="props.disabled"
        >
            <span
                :class="{
                    'dark:stroke-dark-500': props.disabled,
                    'dark:stroke-dark-300 group-hover:dark:stroke-cyan-500':
                        !props.disabled,
                }"
            >
                <slot></slot>
            </span>
        </button>

        <template #tooltip>
            <span
                class="rounded-lg px-2 py-2 text-[.6rem] font-semibold shadow-xl dark:bg-dark-800 dark:text-white"
            >
                <slot name="tooltip"></slot>
            </span>
        </template>
    </VTooltip>
</template>
