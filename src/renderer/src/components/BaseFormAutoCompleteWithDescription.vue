<script setup lang="ts">
import BaseFormAutoComplete from '@components/BaseFormAutoComplete.vue';
import { ref } from 'vue';

export type TItem = {
    name: string;
    description: string;
};
const props = defineProps<{
    items: TItem[];
}>();
const { modelValue } = defineModels<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (e: 'input', payload: KeyboardEvent);
    (e: 'dropdownHidden');
}>();
const showDropdown = ref(false);

const onSelectUpdateTextInput = ({ currentIndex }) => {
    modelValue.value = props.items[currentIndex].name;
};
const onClickSelectItem = (type: TItem) => {
    showDropdown.value = false;
    modelValue.value = type.name;
};
const onKeydownSelectItem = (e: KeyboardEvent, type: TItem) => {
    if (e.key.toLowerCase() !== 'enter') return;
    showDropdown.value = false;
    modelValue.value = type.name;
};
</script>
<template>
    <BaseFormAutoComplete
        class="mb-4"
        id="tableSettingsColumnDataType"
        placeholder="Place column's data type here"
        v-model="modelValue"
        v-model:show-dropdown="showDropdown"
        :items="props.items"
        @input="emits('input', $event)"
        @on-select="onSelectUpdateTextInput"
        @dropdown-hidden="emits('dropdownHidden')"
    >
        <template #label> Data Type:</template>
        <template #float>
            <button
                type="button"
                class="group flex w-full px-2 py-2 text-xs font-semibold outline-none dark:hover:bg-dark-800/70 dark:focus:bg-dark-800/70"
                v-for="type in props.items"
                :key="type.name"
                @click="onClickSelectItem(type)"
                @keydown="onKeydownSelectItem($event, type)"
            >
                <span
                    class="mr-1 w-4/12 shrink-0 truncate text-left group-hover:text-blue-500 group-focus:text-blue-500 dark:text-slate-300"
                    >{{ type.name }}</span
                >
                <p class="w-7/12 truncate text-left dark:text-dark-100">
                    {{ type.description }}
                </p>
            </button>
        </template>
    </BaseFormAutoComplete>
</template>
