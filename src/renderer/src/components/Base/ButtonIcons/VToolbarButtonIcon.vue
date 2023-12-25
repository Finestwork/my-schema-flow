<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';

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
const onClick = (e: MouseEvent) => {
    emits('click', e);
};
</script>
<template>
    <VTooltip>
        <button
            type="button"
            class="flex h-[25px] w-[25px] items-center justify-center rounded p-1.5 outline-none"
            :class="{
                'cursor-not-allowed bg-slate-400 stroke-slate-200 dark:bg-dark-700 dark:stroke-dark-600':
                    props.disabled && !props.isActive,
                'bg-dark-100 stroke-slate-50 hover:bg-cyan-500 hover:stroke-cyan-50 focus:bg-cyan-500 focus:stroke-cyan-50 dark:bg-dark-700/60 dark:stroke-dark-500 dark:hover:bg-cyan-950/60 hover:dark:stroke-cyan-500 dark:focus:bg-cyan-950/60 focus:dark:stroke-cyan-500':
                    !props.disabled && !props.isActive,
                'bg-cyan-500 stroke-cyan-50 dark:bg-cyan-600 dark:stroke-cyan-50':
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
