<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';

type TProps = {
    colorScheme?: 'primary' | 'danger';
};

const emits = defineEmits<{
    (e: 'onClick'): void;
}>();
const props = withDefaults(defineProps<TProps>(), {
    colorScheme: 'primary',
});
</script>
<template>
    <VTooltip>
        <button
            type="button"
            class="block h-[35px] w-[35px] rounded-md p-2"
            :class="{
                'border-2 border-slate-400 bg-white stroke-slate-500 dark:border-dark-500 dark:bg-dark-700 dark:stroke-dark-50':
                    props.colorScheme === 'primary',
                'bg-rose-600 stroke-rose-50': props.colorScheme === 'danger',
            }"
            @click="emits('onClick')"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </VTooltip>
</template>
