<script setup lang="ts">
export type TProps = {
    id: string;
    placeholder: string;
    disabled?: boolean;
    noWhiteSpace?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    noWhiteSpace: false,
});
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (event: 'input', value: Event): void;
    (event: 'blur', value: Event): void;
    (event: 'focus', value: Event): void;
    (event: 'keydown', value: Event | KeyboardEvent): void;
    (event: 'keyup', value: Event | KeyboardEvent): void;
}>();
</script>
<template>
    <div class="h-full w-full">
        <label
            v-if="$slots.label"
            class="mb-1 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300"
            :for="id"
        >
            <slot name="label"></slot>
        </label>
        <input
            :id="props.id"
            v-model="modelValue"
            v-no-white-space="props.noWhiteSpace"
            class="block h-full w-full rounded border-2 bg-transparent p-1.5 text-xs font-bold outline-none transition-shadow duration-150 ease-in-out"
            type="text"
            :class="{
                'border-slate-400 placeholder-slate-500 hover:border-cyan-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 dark:border-slate-700 dark:text-slate-500 dark:placeholder-slate-600 hover:dark:text-slate-300 dark:focus:border-cyan-500':
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
            @keyup="emits('keyup', $event)"
        />
    </div>
</template>
