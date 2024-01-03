<script setup lang="ts">
import VPanelAutoCompleteWrapper from '@components/Base/Forms/VPanelAutoCompleteWrapper.vue';
import VDatabaseWithDescriptionButton from '@components/Base/Buttons/VDatabaseWithDescriptionButton.vue';
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import { useSearchMySQLDataTypes } from '@composables/Miscellaneous/useSearchMySQLDataTypes';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { watch } from 'vue';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import type { Ref } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const scrollbar = ref();
const dropdownBtn: Ref<Array<typeof VDatabaseWithDescriptionButton>> = ref([]);
const showDropdown = ref(false);
const currentIndex = ref(0);
const { searchTerm, getMysqlDataTypes } = useSearchMySQLDataTypes();

const _updateScrollPosition = () => {
    const CurrentElement = dropdownBtn.value[currentIndex.value].$el;
    scrollbar.value.osInstance().elements().scrollEventElement.scrollTop =
        CurrentElement.offsetTop;
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
        if (!DataType) return;
        modelValue.value = DataType.name;
        _updateScrollPosition();
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

const handleKeydownEvent = (e) => {
    if (e.key.toLowerCase() === 'escape') {
        showDropdown.value = false;
        (document.activeElement as HTMLInputElement).blur();
    }
};
onMounted(() => {
    window.addEventListener('keydown', handleKeydownEvent);
});
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydownEvent);
});
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
                class="h-full border-2 border-slate-300 bg-white outline-none dark:border-dark-700 dark:bg-dark-800"
            >
                <OverlayScrollbarsComponent
                    ref="scrollbar"
                    class="max-h-[250px] overflow-y-scroll"
                >
                    <VTooltip
                        v-for="(item, ind) in getMysqlDataTypes"
                        :key="ind"
                        placement="left"
                        class="w-full"
                    >
                        <VDatabaseWithDescriptionButton
                            ref="dropdownBtn"
                            :is-active="currentIndex === ind"
                            @click="onClickChooseDataType(ind)"
                        >
                            <template #name>{{ item.name }}</template>
                            <template
                                v-if="item.description.trim() !== ''"
                                #description
                                >{{ item.description }}
                            </template>
                        </VDatabaseWithDescriptionButton>

                        <template #tooltip>
                            <span class="m-1.5 block text-[.75rem]">
                                {{ item.description }}
                            </span>
                        </template>
                    </VTooltip>
                </OverlayScrollbarsComponent>
            </div>
        </template>
    </VPanelAutoCompleteWrapper>
</template>
