<script setup lang="ts">
export type TProps = {
    id: string;
    placeholder: string;
    disabled?: boolean;
};

const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (event: 'input', value: Event): void;
    (event: 'blur', value: Event): void;
    (event: 'focus', value: Event): void;
    (event: 'keydown', value: Event | KeyboardEvent): void;
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
            :id="props.id"
            v-model="modelValue"
            class="block w-full rounded border-2 p-1.5 text-xs font-semibold outline-none transition-shadow duration-150 ease-in-out dark:bg-dark-900"
            type="text"
            :class="{
                'focus:ring-4 focus:ring-cyan-500/30 dark:border-slate-700 dark:text-slate-500 dark:hover:border-cyan-700 hover:dark:text-slate-300 dark:focus:border-cyan-500 focus:dark:text-slate-300':
                    !props.disabled,
                'cursor-not-allowed dark:border-slate-800 dark:placeholder-slate-700':
                    props.disabled,
            }"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            @input="emits('input', $event)"
            @focus="emits('focus', $event)"
            @blur="emits('blur', $event)"
            @keydown="emits('keydown', $event)"
        />
    </div>
</template>
