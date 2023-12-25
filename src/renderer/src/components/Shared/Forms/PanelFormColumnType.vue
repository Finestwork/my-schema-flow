<script setup lang="ts">
import VPanelAutoCompleteWrapper from '@components/Base/Forms/VPanelAutoCompleteWrapper.vue';
import { useSearchMySQLDataTypes } from '@composables/Miscellaneous/useSearchMySQLDataTypes';
import { nextTick, ref } from 'vue';
import { watch } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const scrollbar = ref();
const dropdownBtn = ref();
const showDropdown = ref(false);
const currentIndex = ref(0);
const { searchTerm, getMysqlDataTypes } = useSearchMySQLDataTypes();

const _updateScrollPosition = () => {
    const CurrentElement = dropdownBtn.value[currentIndex.value];
    scrollbar.value.scrollTop = CurrentElement.offsetTop;
};
const _findIndex = () => {
    const NewIndex = getMysqlDataTypes.value.findIndex((item) =>
        item.name.toLowerCase().includes(modelValue.value.toLowerCase()),
    );
    if (NewIndex !== -1) {
        currentIndex.value = NewIndex;
    }
};

const onClickChooseDataType = (index: number) => {
    currentIndex.value = index;
    const Name = getMysqlDataTypes.value[index].name;
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
    // Make sure that search term keeps track of modelValue
    if (modelValue.value.trim() !== '') {
        searchTerm.value = modelValue.value;
    }

    await nextTick();
    _findIndex();
};
const onKeyDownNavigateDropdown = (e: KeyboardEvent) => {
    const assignDataTypeValue = () => {
        const DataType = getMysqlDataTypes.value[currentIndex.value];
        if (DataType) {
            modelValue.value = DataType.name;
            _updateScrollPosition();
        }
    };

    if (e.key === 'Backspace') {
        _findIndex();
        if (searchTerm.value.trim() === '') {
            return;
        }
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (dropdownBtn.value.length === 1) return;
        if (currentIndex.value <= 0) {
            currentIndex.value = dropdownBtn.value.length - 1;
        } else {
            currentIndex.value--;
        }
        assignDataTypeValue();
        return;
    }

    if (e.key === 'ArrowDown') {
        if (dropdownBtn.value.length === 1) return;
        if (currentIndex.value === dropdownBtn.value.length - 1) {
            currentIndex.value = 0;
        } else {
            currentIndex.value++;
        }
        assignDataTypeValue();
        return;
    }

    if (e.key === 'Enter') {
        const CurrentDatabaseName = getMysqlDataTypes.value[currentIndex.value];

        if (!CurrentDatabaseName) {
            searchTerm.value = modelValue.value;
        } else {
            modelValue.value = CurrentDatabaseName.name;
            searchTerm.value = CurrentDatabaseName.name;
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
        id="addColumnTypeForm"
        v-model="modelValue"
        v-model:show-dropdown="showDropdown"
        placeholder="Place column type here"
        @on-input="onInput"
        @on-input-focus="onFocusShowDropdown"
        @on-input-keydown="onKeyDownNavigateDropdown"
        @on-key-down-navigate-dropdown="onKeyDownNavigateDropdown"
    >
        <template #label>Column Type:</template>
        <template #float>
            <div
                ref="scrollbar"
                class="scrollbar-slim h-full max-h-[250px] overflow-y-scroll bg-white outline-none dark:bg-dark-800/50"
            >
                <button
                    v-for="(item, ind) in getMysqlDataTypes"
                    ref="dropdownBtn"
                    :key="ind"
                    class="group flex w-full justify-between px-2 py-1.5 text-xs font-bold outline-none"
                    type="button"
                    :class="{
                        'bg-cyan-500 hover:bg-cyan-500 focus:bg-cyan-500 dark:bg-cyan-950 dark:hover:bg-cyan-950 dark:focus:bg-cyan-950':
                            currentIndex === ind,
                        'hover:bg-slate-200 focus:bg-slate-200 hover:dark:bg-cyan-950 focus:dark:bg-cyan-950':
                            currentIndex !== ind,
                    }"
                    @click="onClickChooseDataType(ind)"
                >
                    <span
                        class="w-full truncate text-left group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
                        :class="{
                            'text-cyan-50 dark:text-cyan-500':
                                currentIndex === ind,
                            'text-slate-800 dark:text-slate-500':
                                currentIndex !== ind,
                        }"
                        >{{ item.name }}</span
                    >
                    <span
                        class="w-full truncate text-left group-hover:dark:text-cyan-700 group-focus:dark:text-cyan-700"
                        :class="{
                            'text-cyan-200 dark:text-cyan-700':
                                currentIndex === ind,
                            'text-slate-400 dark:text-slate-700':
                                currentIndex !== ind,
                        }"
                        >{{ item.description }}</span
                    >
                </button>
            </div>
        </template>
    </VPanelAutoCompleteWrapper>
</template>
