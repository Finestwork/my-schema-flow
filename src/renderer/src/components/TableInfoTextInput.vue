<script setup lang="ts">
import { ref } from 'vue';
export type TProps = {
    id: string;
    placeholder: string;
};

const input = ref();
const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (e: 'focus', payload: FocusEvent): void;
    (e: 'blur', payload: FocusEvent): void;
    (e: 'keydown', payload: KeyboardEvent): void;
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
            :id="props.id"
            ref="input"
            v-model="modelValue"
            class="block w-full rounded-sm border-2 bg-transparent px-1.5 py-1.5 text-xs font-semibold outline-none transition-shadow duration-300 focus:ring-4 focus:ring-blue-500/60 dark:border-slate-500 dark:text-slate-300 dark:focus:border-blue-300"
            type="text"
            :placeholder="props.placeholder"
            @focus="emits('focus', $event)"
            @blur="emits('blur', $event)"
            @keydown="emits('keydown', $event)"
            @input="emits('input', $event)"
        />
    </div>
</template>
