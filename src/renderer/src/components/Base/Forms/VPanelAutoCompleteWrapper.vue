<script setup lang="ts">
import { useDropdownFloatingLayout } from '@composables/useDropdownFloatingLayout';
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
    (e: 'onInputKeydown', value: Event): void;
    (e: 'onKeyDownNavigateDropdown', value: Event): void;
}>();
const rootWrapper = ref();
const input = ref();
const floating = ref();

const { floatingStyles } = useDropdownFloatingLayout(input, floating);
const onClickToggleDropdown = (e: MouseEvent) => {
    const Target = e.target as HTMLElement;
    if (!showDropdown.value) return;

    if (Target.tagName !== 'INPUT' && !floating.value.contains(Target)) {
        showDropdown.value = false;
    }
};
onClickOutside(rootWrapper, () => {
    showDropdown.value = false;
});
</script>

<template>
    <div ref="rootWrapper" @click="onClickToggleDropdown">
        <div>
            <label
                class="mb-1 cursor-pointer text-xs font-semibold dark:text-slate-300"
                :for="id"
            >
                <slot name="label"></slot>
            </label>
            <input
                ref="input"
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
                @input="emits('onInput', $event)"
                @focus="emits('onInputFocus', $event)"
                @keydown="emits('onInputKeydown', $event)"
            />
        </div>
        <div
            v-if="showDropdown"
            ref="floating"
            class="absolute overflow-hidden shadow-sm dark:bg-dark-900"
            :style="floatingStyles"
            @keydown="emits('onKeyDownNavigateDropdown', $event)"
        >
            <slot name="float"></slot>
        </div>
    </div>
</template>
