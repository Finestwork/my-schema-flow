<script setup lang="ts">
const emits = defineEmits<{
    (e: 'click', payload: Event);
}>();
</script>
<template>
    <button
        class="flex w-full truncate px-2 py-2 text-xs font-semibold outline-none group-hover:text-blue-500 group-focus:text-blue-500 dark:text-slate-300 dark:hover:bg-dark-800/70 dark:focus:bg-dark-800/70"
        type="button"
        @click="emits('click', $event)"
    >
        <slot></slot>
    </button>
</template>
