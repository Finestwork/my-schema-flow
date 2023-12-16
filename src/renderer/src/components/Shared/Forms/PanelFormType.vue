<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import { useDropdownFloatingLayout } from '@composables/useDropdownFloatingLayout';
import { useDatabaseDropdown } from '@composables/useDatabaseDropdown';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { onClickOutside } from '@vueuse/core';
import { ref, watch } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const scrollbar = ref();
const rootWrapper = ref();
const dropdownBtn = ref();
const reference = ref();
const floating = ref();

const { floatingStyles } = useDropdownFloatingLayout(reference, floating);
const {
    showDropdown,
    searchTerm,
    currentIndex,
    getMysqlDatTypes,
    updateActiveIndex,
    onKeyDownNavigateDropdown,
} = useDatabaseDropdown(dropdownBtn, scrollbar, modelValue);

const onClickToggleDropdown = (e: MouseEvent) => {
    const Target = e.target as HTMLElement;
    if (!showDropdown.value) return;

    if (Target.tagName !== 'INPUT' && !floating.value.contains(Target)) {
        showDropdown.value = false;
    }
};
const onFocusShowDropdown = () => {
    showDropdown.value = true;
    updateActiveIndex();
    if (modelValue.value.trim() !== '') {
        searchTerm.value = modelValue.value;
    }
};
const onClickChooseDataType = (index: number) => {
    currentIndex.value = index;
    const Name = getMysqlDatTypes.value[index].name;
    modelValue.value = Name;
    searchTerm.value = Name;
    showDropdown.value = false;
};

onClickOutside(rootWrapper, () => {
    showDropdown.value = false;
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
    <div ref="rootWrapper" @click="onClickToggleDropdown">
        <VPanelTextInput
            id="addColumnTypeForm"
            ref="reference"
            v-model="modelValue"
            placeholder="Place column type here"
            @input="searchTerm = $event.target.value"
            @focus="onFocusShowDropdown"
            @keydown="onKeyDownNavigateDropdown"
        >
            <template #label>Column Type:</template>
        </VPanelTextInput>
        <div
            v-if="showDropdown"
            ref="floating"
            class="absolute overflow-hidden shadow-sm dark:bg-dark-900"
            :style="floatingStyles"
            @keydown="onKeyDownNavigateDropdown"
        >
            <OverlayScrollbarsComponent
                ref="scrollbar"
                class="h-full max-h-[250px] outline-none dark:bg-dark-800/50"
            >
                <button
                    v-for="(item, ind) in getMysqlDatTypes"
                    ref="dropdownBtn"
                    :key="item.name"
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
                        >{{ item.name }}</span
                    >
                    <span
                        class="w-full truncate text-left group-hover:dark:text-cyan-700 group-focus:dark:text-cyan-700"
                        :class="{
                            'dark:text-cyan-700': currentIndex === ind,
                            'dark:text-slate-700': currentIndex !== ind,
                        }"
                        >{{ item.description }}</span
                    >
                </button>
            </OverlayScrollbarsComponent>
        </div>
    </div>
</template>
