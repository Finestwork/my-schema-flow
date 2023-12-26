<script setup lang="ts">
import { useDropdownFloatingLayout } from '@composables/Miscellaneous/useDropdownFloatingLayout';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

export type TProps = {
    id: string;
    placeholder: string;
    disabled?: boolean;
};
const props = withDefaults(defineProps<TProps>(), {
    disabled: false,
});
const { modelValue, showDropdown } = defineModels<{
    modelValue: string;
    showDropdown: boolean;
}>();
const emits = defineEmits<{
    (e: 'onInput', value: Event): void;
    (e: 'onInputFocus', value: Event): void;
    (e: 'onInputKeydown', value: KeyboardEvent): void;
    (e: 'onInputKeyup', value: KeyboardEvent): void;
    (e: 'onKeyDownNavigateDropdown', value: KeyboardEvent): void;
}>();
const rootWrapper = ref();
const input = ref();
const floating = ref();

const { floatingStyles, update } = useDropdownFloatingLayout(input, floating);
const onClickToggleDropdown = (e: MouseEvent) => {
    const Target = e.target as HTMLElement;
    if (!showDropdown.value) return;

    if (Target.tagName !== 'INPUT' && !floating.value.contains(Target)) {
        showDropdown.value = false;
    }
};
const onInput = (e: Event) => {
    update();
    emits('onInput', e);
};
onClickOutside(rootWrapper, () => {
    showDropdown.value = false;
});
</script>

<template>
    <div ref="rootWrapper" @click="onClickToggleDropdown">
        <div>
            <label
                class="mb-1 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300"
                :for="id"
            >
                <slot name="label"></slot>
            </label>
            <input
                :id="props.id"
                ref="input"
                v-model="modelValue"
                class="block w-full rounded border-2 bg-transparent p-1.5 text-xs font-semibold outline-none transition-shadow duration-150 ease-in-out dark:bg-dark-900"
                type="text"
                :class="{
                    'border-slate-400 placeholder-slate-500 hover:border-cyan-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 dark:border-slate-700 dark:text-slate-500 dark:placeholder-slate-600 hover:dark:text-slate-300':
                        !props.disabled,
                    'cursor-not-allowed dark:border-slate-800 dark:placeholder-slate-700':
                        props.disabled,
                }"
                :placeholder="props.placeholder"
                :disabled="props.disabled"
                @input="onInput"
                @focus="emits('onInputFocus', $event)"
                @keydown="emits('onInputKeydown', $event)"
                @keyup="emits('onInputKeyup', $event)"
            />
        </div>
        <div
            v-if="showDropdown"
            ref="floating"
            class="absolute overflow-hidden bg-white shadow-sm dark:bg-dark-900"
            :style="floatingStyles"
            @keydown="emits('onKeyDownNavigateDropdown', $event)"
        >
            <slot name="float"></slot>
        </div>
    </div>
</template>
