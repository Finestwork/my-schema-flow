<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
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
        <VPanelTextInput
            :id="props.id"
            ref="input"
            v-model="modelValue"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :no-white-space="true"
            @input="onInput"
            @focus="emits('onInputFocus', $event)"
            @keydown="emits('onInputKeydown', $event)"
            @keyup="emits('onInputKeyup', $event)"
        >
            <template #label>
                <slot name="label"></slot>
            </template>

            <template v-if="$slots.helper" #helper>
                <slot name="helper"></slot>
            </template>
        </VPanelTextInput>
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
