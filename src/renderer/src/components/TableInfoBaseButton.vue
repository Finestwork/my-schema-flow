<script setup lang="ts">
const { disabled } = defineProps<{
    disabled?: boolean;
}>();
const emits = defineEmits<{
    (e: 'click', payload: Event);
}>();
</script>
<template>
    <button
        class="group flex w-full items-center justify-center rounded py-2.5 outline-none disabled:cursor-not-allowed dark:bg-dark-700 dark:hover:bg-blue-600/10 dark:focus:bg-blue-600/10 dark:disabled:hover:bg-dark-700"
        type="button"
        :disabled="disabled"
        @click="emits('click', $event)"
    >
        <span
            class="mr-1 block w-[10px]"
            :class="{
                'stroke-slate-600': disabled,
                'dark:dark:stroke-slate-300 group-hover:dark:stroke-blue-500 group-focus:dark:stroke-blue-500':
                    !disabled,
            }"
        >
            <slot name="icon"></slot>
        </span>
        <span
            class="text-xs font-semibold"
            :class="{
                'dark:text-slate-600': disabled,
                'dark:text-slate-300 group-hover:dark:text-blue-500 group-focus:dark:text-blue-500':
                    !disabled,
            }"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
