<script setup lang="ts">
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import type { TProps } from '@components/TableInfoTextInput.vue';
import { useFocusLoop } from '@composables/useFocusLoop';
import { computePosition, size } from '@floating-ui/dom';
import { ref, watch } from 'vue';

const props = defineProps<TProps>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const source = ref();
const floatingDropdown = ref();
const showDropdown = ref(false);
const { focusNext, focusPrevious, getFocusableElements } = useFocusLoop(floatingDropdown);

const onWatchToggleDropdown = () => {
    if (!floatingDropdown.value) return;
    getFocusableElements();
    const Middlewares = [
        size({
            apply({ rects }) {
                Object.assign(floatingDropdown.value.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
    ];
    computePosition(source.value, floatingDropdown.value, { middleware: Middlewares }).then(
        ({ x, y }) => {
            Object.assign(floatingDropdown.value.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        },
    );
};
watch(showDropdown, onWatchToggleDropdown, { flush: 'post' });

const onBlur = (e: FocusEvent) => {
    if (!floatingDropdown.value) return;

    if (!floatingDropdown.value.contains(e.relatedTarget)) {
        showDropdown.value = false;
    }
};
const onKeydown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'arrowdown') {
        focusNext();
    }
    if (e.key.toLowerCase() === 'arrowup') {
        focusPrevious();
    }
};
</script>

<template>
    <div ref="source">
        <TableInfoTextInput
            :id="props.id"
            :placeholder="props.placeholder"
            v-model="modelValue"
            @focus="showDropdown = true"
            @blur="onBlur"
            @keydown="onKeydown"
        >
            <template #label>
                <slot name="label"></slot>
            </template>
        </TableInfoTextInput>

        <div
            ref="floatingDropdown"
            class="scrollbar-slim absolute max-h-[200px] overflow-y-scroll bg-white shadow-xl dark:bg-dark-700"
            v-if="showDropdown"
        >
            <slot name="float"></slot>
        </div>
    </div>
</template>
