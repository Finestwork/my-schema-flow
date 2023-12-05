<script setup lang="ts">
import VTooltip from '@components/Shared/Tooltips/VTooltip.vue';

type TProps = {
    colorScheme?: 'default' | 'danger';
    disabled?: boolean;
};

const emits = defineEmits<{
    (e: 'click', payload: Event);
}>();
const props = withDefaults(defineProps<TProps>(), {
    colorScheme: 'default',
    disabled: false,
});
</script>

<template>
    <VTooltip>
        <button
            class="flex h-[25px] w-[25px] rounded-md p-2 outline-none dark:bg-dark-600 dark:stroke-slate-300"
            :class="{
                'dark:hover:bg-blue-500 dark:focus:bg-blue-500':
                    props.colorScheme === 'default' && !disabled,
                'dark:hover:bg-rose-500 dark:focus:bg-rose-500':
                    props.colorScheme === 'danger' && !disabled,
                'cursor-not-allowed dark:bg-dark-700 dark:stroke-slate-600': disabled,
            }"
            type="button"
            :disabled="disabled"
            @click="emits('click', $event)"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
