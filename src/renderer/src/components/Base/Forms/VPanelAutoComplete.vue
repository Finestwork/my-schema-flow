<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import { useDropdownFloatingLayout } from '@composables/useDropdownFloatingLayout';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

export type TProps = {
    id: string;
    placeholder: string;
};
const props = defineProps<TProps>();
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
const reference = ref();
const floating = ref();

const { floatingStyles } = useDropdownFloatingLayout(reference, floating);
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
        <VPanelTextInput
            :id="props.id"
            ref="reference"
            v-model="modelValue"
            :placeholder="placeholder"
            @input="emits('onInput', $event)"
            @focus="emits('onInputFocus', $event)"
            @keydown="emits('onInputKeydown', $event)"
        >
            <template #label>
                <slot name="label"></slot>
            </template>
        </VPanelTextInput>
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
