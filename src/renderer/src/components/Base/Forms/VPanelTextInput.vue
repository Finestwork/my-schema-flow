<script setup lang="ts">
import VHelperButtonIcon from '@components/Base/ButtonIcons/VHelperButtonIcon.vue';

export type TProps = {
    id: string;
    placeholder: string;
    disabled?: boolean;
    isNumber?: boolean;
    noWhiteSpace?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    isNumber: false,
    noWhiteSpace: false,
});
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (event: 'input', value: Event): void;
    (event: 'blur', value: Event): void;
    (event: 'focus', value: Event): void;
    (event: 'keydown', value: KeyboardEvent): void;
    (event: 'keyup', value: KeyboardEvent): void;
}>();
</script>
<template>
    <div class="h-full w-full">
        <div
            v-if="$slots.label"
            class="flex items-center"
            :class="{
                'mb-1': !$slots.helper,
                'mb-2': $slots.helper,
            }"
        >
            <label
                class="cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300"
                :for="id"
            >
                <slot name="label"></slot>
            </label>
            <VHelperButtonIcon v-if="$slots.helper" class="ml-1">
                <template v-if="$slots.helper" #helper>
                    <slot name="helper"></slot>
                </template>
            </VHelperButtonIcon>
        </div>
        <input
            :id="props.id"
            v-model="modelValue"
            v-number-only="props.isNumber"
            v-no-white-space="props.noWhiteSpace"
            class="block h-full w-full rounded border-2 bg-transparent p-1.5 text-xs font-bold outline-none transition-shadow duration-150 ease-in-out"
            type="text"
            :class="{
                'border-slate-400 placeholder-slate-500 hover:border-cyan-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 dark:border-slate-700 dark:text-slate-500 dark:placeholder-slate-600 dark:hover:border-cyan-500 hover:dark:text-slate-300 dark:focus:border-cyan-500':
                    !props.disabled,
                'cursor-not-allowed border-slate-300 placeholder-slate-400 dark:border-slate-800 dark:placeholder-slate-700':
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
