<script setup lang="ts">
import VPanelAutoCompleteWrapper from '@components/Base/Forms/VPanelAutoCompleteWrapper.vue';
import { nextTick, ref, watch } from 'vue';

export type TProps = {
    id: string;
    placeholder: string;
    disabled?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    disabled: false,
});
const { modelValue, dropdownItems } = defineModels<{
    modelValue: string;
    dropdownItems: Array<string>;
}>();
const scrollbar = ref();
const dropdownBtn = ref();
const searchTerm = ref('');
const showDropdown = ref(false);
const currentIndex = ref(0);

const _updateScrollPosition = () => {
    const CurrentElement = dropdownBtn.value[currentIndex.value];
    scrollbar.value.scrollTop = CurrentElement.offsetTop;
};
const _findIndex = () => {
    const NewIndex = dropdownItems.value.findIndex((item) =>
        item.toLowerCase().includes(modelValue.value.toLowerCase()),
    );
    if (NewIndex !== -1) {
        currentIndex.value = NewIndex;
    }
};

const onClickChooseDataType = (index: number) => {
    currentIndex.value = index;
    const Name = dropdownItems.value[index];
    modelValue.value = Name;
    searchTerm.value = Name;
    showDropdown.value = false;
};

const onInput = (e: Event) => {
    const Target = e.target as HTMLInputElement;
    searchTerm.value = Target.value;
};
const onFocusShowDropdown = async () => {
    showDropdown.value = true;

    // Just in case when the user forgets to select an item
    if (modelValue.value.trim() !== '') {
        searchTerm.value = modelValue.value;
    }

    await nextTick();
    _findIndex();
};
const onKeyDownNavigateDropdown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
        _findIndex();
        if (searchTerm.value.trim() === '') {
            return;
        }
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault(); // Prevent selection range from jumping to the left when navigating
        if (dropdownBtn.value.length === 1) return;
        if (currentIndex.value <= 0) {
            currentIndex.value = dropdownBtn.value.length - 1;
        } else {
            currentIndex.value--;
        }
        modelValue.value = dropdownItems.value[currentIndex.value];
        _updateScrollPosition();
        return;
    }

    if (e.key === 'ArrowDown') {
        if (dropdownBtn.value.length === 1) return;
        if (currentIndex.value === dropdownBtn.value.length - 1) {
            currentIndex.value = 0;
        } else {
            currentIndex.value++;
        }
        modelValue.value = dropdownItems.value[currentIndex.value];
        _updateScrollPosition();
        return;
    }

    if (e.key === 'Enter') {
        const CurrentColumn = dropdownItems.value[currentIndex.value];
        if (!CurrentColumn) {
            searchTerm.value = modelValue.value;
        } else {
            modelValue.value = CurrentColumn;
            searchTerm.value = CurrentColumn;
        }

        showDropdown.value = false;
        (e.target as HTMLInputElement).blur();
    }
};

watch(
    () => modelValue.value,
    (value: string) => {
        if (value.trim() === '') {
            searchTerm.value = '';
        }
    },
);
</script>

<template>
    <VPanelAutoCompleteWrapper
        :id="props.id"
        v-model="modelValue"
        v-model:show-dropdown="showDropdown"
        :placeholder="placeholder"
        :disabled="props.disabled"
        @on-input="onInput"
        @on-input-focus="onFocusShowDropdown"
        @on-input-keydown="onKeyDownNavigateDropdown"
        @on-key-down-navigate-dropdown="onKeyDownNavigateDropdown"
    >
        <template #label>
            <slot name="label"></slot>
        </template>
        <template #float>
            <div
                ref="scrollbar"
                class="scrollbar-slim h-full max-h-[250px] overflow-y-scroll outline-none dark:bg-dark-800/50"
            >
                <button
                    v-for="(item, ind) in dropdownItems"
                    ref="dropdownBtn"
                    :key="ind"
                    class="group flex w-full justify-between px-2 py-1.5 text-xs font-bold outline-none hover:dark:bg-cyan-950 focus:dark:bg-cyan-950"
                    type="button"
                    :class="{
                        'dark:bg-cyan-950': currentIndex === ind,
                    }"
                    @click="onClickChooseDataType(ind)"
                >
                    <span
                        class="w-full truncate text-left group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
                        :class="{
                            'dark:text-cyan-500': currentIndex === ind,
                            'dark:text-slate-500': currentIndex !== ind,
                        }"
                        >{{ item }}</span
                    >
                </button>
            </div>
        </template>
    </VPanelAutoCompleteWrapper>
</template>
