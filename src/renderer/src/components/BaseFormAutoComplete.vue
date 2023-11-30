<script setup lang="ts">
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import type { TProps } from '@components/TableInfoTextInput.vue';
import { useFocusLoop } from '@composables/useFocusLoop';
import { toggleDropdown } from '@composables/useAutocomplete';
import { onClickOutside } from '@vueuse/core';
import { watchDebounced } from '@vueuse/core';
import { onUnmounted, ref, watch } from 'vue';

const props = defineProps<
    TProps & {
        items: unknown[];
    }
>();
const { modelValue, showDropdown } = defineModels<{
    modelValue: string;
    showDropdown: boolean;
}>();
const emits = defineEmits<{
    (e: 'input', payload: Event): void;
    (e: 'blur', payload: Event): void;
    (e: 'onSelect', { currentIndex: number }): void;
    (e: 'dropdownHidden'): void;
}>();
const source = ref();
const floatingDropdown = ref();
const floatingDropdownChildren = ref();
const tableInfoTextInput = ref();
const { focusNext, focusPrevious, currentIndex } = useFocusLoop(
    floatingDropdown,
    floatingDropdownChildren,
);

const onTextInputBlur = (e: FocusEvent) => {
    emits('blur', e);
    if (!floatingDropdown.value) return;

    if (!floatingDropdown.value.contains(e.relatedTarget)) {
        showDropdown.value = false;
    }
};
const onTextInputKeydown = async (e: KeyboardEvent) => {
    // Add delay so that when text input got blurred, a dropdown component will position the scroll bar correctly
    setTimeout(() => {
        if (e.key.toLowerCase() === 'arrowdown') {
            focusNext();
            emits('onSelect', { currentIndex: currentIndex.value });
        }
        if (e.key.toLowerCase() === 'arrowup') {
            focusPrevious();
            emits('onSelect', { currentIndex: currentIndex.value });
        }
    }, 15);
};
const onFloatingDropdownKeydown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key.toLowerCase() === 'arrowdown') {
        focusNext();
        emits('onSelect', { currentIndex: currentIndex.value });
    }
    if (e.key.toLowerCase() === 'arrowup') {
        focusPrevious();
        emits('onSelect', { currentIndex: currentIndex.value });
    }
};
const onResizeUpdateDropdownSize = () => {
    (<HTMLElement>document.activeElement)?.blur();
    showDropdown.value = false;
};

window.addEventListener('resize', onResizeUpdateDropdownSize);
onClickOutside(source, () => {
    showDropdown.value = false;
    emits('dropdownHidden');
});
onUnmounted(() => {
    window.removeEventListener('resize', onResizeUpdateDropdownSize);
});
watch(
    showDropdown,
    (showDropdown) => {
        if (!showDropdown) {
            currentIndex.value = -1;
            return;
        }
        floatingDropdownChildren.value = source.value.querySelectorAll('button');
        const TextInput = source.value.querySelector('input');
        toggleDropdown(TextInput, floatingDropdown);
    },
    { flush: 'post' },
);
watchDebounced(
    () => props.items,
    async (items) => {
        if (items.length === 0) currentIndex.value = -1;
        if (!source.value) return;
        floatingDropdownChildren.value = source.value.querySelectorAll('button');
    },
    { debounce: 150, flush: 'post' },
);
</script>

<template>
    <div ref="source">
        <TableInfoTextInput
            ref="tableInfoTextInput"
            :id="props.id"
            :placeholder="props.placeholder"
            v-model="modelValue"
            @focus="showDropdown = true"
            @blur="onTextInputBlur"
            @keydown="onTextInputKeydown"
            @input="emits('input', $event)"
        >
            <template #label>
                <slot name="label"></slot>
            </template>
        </TableInfoTextInput>
        <div
            ref="floatingDropdown"
            class="scrollbar-slim absolute max-h-[200px] overflow-y-scroll bg-white shadow-xl dark:bg-dark-700"
            v-if="showDropdown"
            @keydown="onFloatingDropdownKeydown"
        >
            <slot name="float"></slot>
        </div>
    </div>
</template>
