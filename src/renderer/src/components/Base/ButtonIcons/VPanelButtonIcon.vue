<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';

export type TProps = {
    colorScheme?: 'primary' | 'danger';
    disabled?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    colorScheme: 'primary',
    disabled: false,
});
const emits = defineEmits<{
    (e: 'onClick', value: MouseEvent): void;
}>();
</script>
<template>
    <VTooltip>
        <button
            type="button"
            class="block h-[25px] w-[25px] rounded p-2 outline-none dark:stroke-slate-300"
            :class="{
                'bg-cyan-600 stroke-white hover:bg-cyan-600/90 focus:bg-cyan-600/90 dark:bg-dark-800 dark:stroke-slate-500 hover:dark:bg-cyan-950 hover:dark:stroke-cyan-500 focus:dark:bg-cyan-950 focus:dark:stroke-cyan-500':
                    props.colorScheme === 'primary' && !props.disabled,
                'bg-red-600 stroke-red-50 dark:bg-red-500 dark:stroke-red-50 dark:hover:bg-red-500/90':
                    props.colorScheme === 'danger' && !props.disabled,
                'cursor-not-allowed bg-slate-300 stroke-slate-400 dark:bg-dark-800/90 dark:stroke-slate-700':
                    props.disabled,
            }"
            @click="emits('onClick', $event)"
        >
            <slot></slot>
        </button>
        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
