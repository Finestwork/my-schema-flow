<script setup lang="ts">
import VTooltip from '@components/Base/Layouts/VTooltip.vue';

export type TProps = {
    colorScheme?: 'primary' | 'danger';
    disabled?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    colorScheme: 'primary',
    disabled: false,
});
const emits = defineEmits<{
    (e: 'click', e: MouseEvent): void;
}>();
</script>
<template>
    <VTooltip :offset-y="10">
        <button
            type="button"
            class="block h-[25px] w-[25px] rounded p-2 outline-none dark:stroke-slate-300"
            :class="{
                'dark:bg-dark-800 dark:stroke-slate-500 hover:dark:bg-cyan-950 hover:dark:stroke-cyan-500 focus:dark:bg-cyan-950 focus:dark:stroke-cyan-500':
                    props.colorScheme === 'primary' && !props.disabled,
                'dark:bg-red-500 dark:stroke-red-50 dark:hover:bg-red-500/90':
                    props.colorScheme === 'danger' && !props.disabled,
                'cursor-not-allowed dark:bg-dark-800/90 dark:stroke-slate-700':
                    props.disabled,
            }"
            @click="emits('click', $event)"
        >
            <slot></slot>
        </button>
        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
