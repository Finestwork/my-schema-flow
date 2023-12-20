<script setup lang="ts">
import VTooltip from '@components/Base/Layouts/VTooltip.vue';
import { nextTick } from 'vue';

export type TButtonProps = {
    disabled?: boolean;
    isActive?: boolean;
};
const props = withDefaults(defineProps<TButtonProps>(), {
    disabled: false,
    isActive: false,
});
const emits = defineEmits<{
    (e: 'click', value: MouseEvent): void;
}>();
const onClick = async (e: MouseEvent) => {
    emits('click', e);
    await nextTick();
    (e.target as HTMLElement).blur();
};
</script>
<template>
    <VTooltip :offset-y="11">
        <button
            type="button"
            class="flex h-[25px] w-[25px] items-center justify-center rounded p-1.5 outline-none"
            :class="{
                'cursor-not-allowed dark:bg-dark-700 dark:stroke-dark-600':
                    props.disabled && !props.isActive,
                'dark:bg-dark-700/60 dark:stroke-dark-300 dark:hover:bg-cyan-950/60 hover:dark:stroke-cyan-500 dark:focus:bg-cyan-950/60 focus:dark:stroke-cyan-500':
                    !props.disabled && !props.isActive,
                'dark:bg-cyan-950/60 dark:stroke-cyan-500':
                    props.isActive && !props.disabled,
            }"
            :disabled="props.disabled"
            @click="onClick"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
