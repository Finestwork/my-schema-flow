<script setup lang="ts">
export type TProps = {
    placeholder: string;
    id: string;
};

const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (event: 'input', value: Event): void;
    (event: 'blur', value: Event): void;
    (event: 'focus', value: Event): void;
}>();
</script>
<template>
    <div class="w-full">
        <label
            class="mb-1 cursor-pointer text-xs font-semibold dark:text-slate-300"
            :for="id"
        >
            <slot name="label"></slot>
        </label>
        <input
            :id="id"
            v-model="modelValue"
            class="block w-full rounded border-2 p-1.5 text-xs font-semibold outline-none transition-shadow duration-150 ease-in-out focus:ring-4 focus:ring-cyan-500/30 dark:border-slate-700 dark:bg-dark-900 dark:text-slate-500 dark:hover:border-cyan-700 hover:dark:text-slate-300 dark:focus:border-cyan-500 focus:dark:text-slate-300"
            type="text"
            :placeholder="placeholder"
            @input="emits('input', $event)"
            @focus="emits('focus', $event)"
            @blur="emits('blur', $event)"
        />
    </div>
</template>
