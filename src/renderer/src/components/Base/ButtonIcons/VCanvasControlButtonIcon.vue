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
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
