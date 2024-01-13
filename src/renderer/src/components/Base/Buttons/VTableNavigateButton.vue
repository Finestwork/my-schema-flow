<script setup lang="ts">
const props = defineProps<{
    disabled?: boolean;
}>();
</script>
<template>
    <button
        type="button"
        class="rounded-md px-2 py-2 text-xs font-semibold outline-none"
        :class="{
            'bg-cyan-600 text-cyan-50 ring-0 ring-cyan-500/50 transition-shadow hover:bg-cyan-600/90 focus-visible:ring-4':
                !props.disabled,
            'cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-dark-600':
                props.disabled,
        }"
        :disabled="props.disabled"
    >
        <slot></slot>
    </button>
</template>
