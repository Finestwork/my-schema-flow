<script setup lang="ts">
const { isActive } = defineProps<{
    isActive?: boolean;
}>();
</script>
<template>
    <button
        class="rounded px-3 py-2 text-xs font-semibold"
        :class="{
            'dark:bg-blue-500/10 dark:text-blue-500': isActive,
            'dark:bg-dark-700 dark:text-slate-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-500 dark:focus:bg-blue-500/10 dark:focus:text-blue-500':
                !isActive,
        }"
        type="button"
    >
        <slot></slot>
    </button>
</template>
