<script setup lang="ts">
const emits = defineEmits<{
    (event: 'click', value: Event);
}>();
</script>
<template>
    <button
        type="button"
        class="group flex w-full items-center justify-center rounded px-1 py-2 font-semibold outline-none dark:bg-dark-800 hover:dark:bg-cyan-950/50 focus:dark:bg-cyan-950/50"
        @click="emits('click', $event)"
    >
        <span
            class="mr-1 block w-[10px] dark:stroke-slate-400 group-hover:dark:stroke-cyan-500 group-focus:dark:stroke-cyan-500"
        >
            <slot name="icon"></slot>
        </span>
        <span
            class="text-xs dark:text-slate-400 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
