<script setup lang="ts">
import { ref } from 'vue';
export type TProps = {
    id: string;
    placeholder: string;
    modelValue: string;
};

const input = ref();
const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (e: 'focus', payload: Event): void;
    (e: 'blur', payload: Event): void;
    (e: 'keydown', payload: Event): void;
    (e: 'input', payload: Event): void;
}>();
defineExpose({
    input,
});
</script>

<template>
    <div>
        <label
            class="mb-2 inline-flex cursor-pointer text-xs font-semibold dark:text-slate-500"
            :for="props.id"
        >
            <slot name="label"></slot>
        </label>
        <input
            ref="input"
            class="block w-full rounded-sm border-2 bg-transparent px-1.5 py-1.5 text-xs font-semibold outline-none transition-shadow duration-300 focus:ring-4 focus:ring-blue-500/60 dark:border-slate-500 dark:text-slate-300 dark:focus:border-blue-300"
            type="text"
            :placeholder="props.placeholder"
            :id="props.id"
            v-model="modelValue"
            @focus="emits('focus', $event)"
            @blur="emits('blur', $event)"
            @keydown="emits('keydown', $event)"
            @input="emits('input', $event)"
        />
    </div>
</template>
