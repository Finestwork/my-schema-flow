<script setup lang="ts">
import { computed } from 'vue';

export type TAlert = {
    colorScheme?: 'success' | 'danger';
};

const props = withDefaults(defineProps<TAlert>(), {
    colorScheme: 'success',
});
const isDanger = computed(() => props.colorScheme === 'danger');
const isSuccess = computed(() => props.colorScheme === 'success');
</script>

<template>
    <p
        class="rounded p-2 text-center text-xs font-semibold text-white"
        :class="{
            'dark:bg-rose-500/90': isDanger,
            'dark:bg-emerald-500/80': isSuccess,
        }"
    >
        <slot></slot>
    </p>
</template>
