<script setup lang="ts">
const emits = defineEmits<{
    (e: 'click', payload: Event);
}>();
</script>
<template>
    <button
        class="group flex w-full items-center justify-center rounded py-2.5 outline-none dark:bg-dark-700 dark:hover:bg-blue-600/10 dark:focus:bg-blue-600/10"
        type="button"
        @click="emits('click', $event)"
    >
        <span
            class="mr-1 block w-[10px] group-hover:stroke-blue-500 group-focus:stroke-blue-500 dark:stroke-slate-300"
        >
            <slot name="icon"></slot>
        </span>
        <span
            class="text-xs font-semibold group-hover:text-blue-500 group-focus:text-blue-500 dark:text-slate-300"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
