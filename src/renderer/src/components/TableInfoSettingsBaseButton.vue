<script setup lang="ts">
import BaseTooltip from '@components/BaseTooltip.vue';

type TProps = {
    colorScheme?: 'default' | 'danger';
};

const props = withDefaults(defineProps<TProps>(), {
    colorScheme: 'default',
});
</script>
<template>
    <BaseTooltip>
        <button
            class="flex h-[25px] w-[25px] rounded-md bg-red-500 p-2 outline-none dark:bg-dark-600 dark:stroke-slate-300"
            :class="{
                'dark:hover:bg-blue-500 dark:focus:bg-blue-500': props.colorScheme === 'default',
                'dark:hover:bg-rose-500 dark:focus:bg-rose-500': props.colorScheme === 'danger',
            }"
            type="button"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <slot name="tooltip"></slot>
        </template>
    </BaseTooltip>
</template>
