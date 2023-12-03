<script setup lang="ts">
import BaseFormAutoComplete from '@components/BaseFormAutoComplete.vue';
import BaseFormAutoCompleteItem from '@components/BaseFormAutoCompleteItem.vue';
import { reactive } from 'vue';

const states = reactive({
    showAttributeDropdown: false,
});
const { id, placeholder, items } = defineProps<{
    id: string;
    placeholder: string;
    items: string[];
}>();
const { modelValue, searchTerm } = defineModels<{
    modelValue: string;
    searchTerm: string;
}>();
const onSelectUpdateAttribute = ({ currentIndex }) => {
    modelValue.value = items[currentIndex];
};
const onInputUpdateSearchTerm = (e: Event) => {
    const Target = <HTMLInputElement>e.currentTarget;
    searchTerm.value = Target.value;
};
const onKeydownChooseAttribute = (e: KeyboardEvent, value: string) => {
    if (e.key.toLowerCase() !== 'enter') return;
    modelValue.value = value;
    searchTerm.value = value;
    states.showAttributeDropdown = false;
};
const onClickChooseAttribute = (value: string) => {
    modelValue.value = value;
    searchTerm.value = value;
    states.showAttributeDropdown = false;
};
</script>

<template>
    <BaseFormAutoComplete
        :id="id"
        :placeholder="placeholder"
        v-model="modelValue"
        v-model:show-dropdown="states.showAttributeDropdown"
        :items="items"
        @on-select="onSelectUpdateAttribute"
        @input="onInputUpdateSearchTerm"
    >
        <template #label>
            <slot name="label"></slot>
        </template>
        <template #float>
            <div class="scrollbar-slim">
                <BaseFormAutoCompleteItem
                    v-for="attr in items"
                    @keydown="onKeydownChooseAttribute($event, attr)"
                    @click="onClickChooseAttribute(attr)"
                >
                    {{ attr }}
                </BaseFormAutoCompleteItem>
            </div>
        </template>
    </BaseFormAutoComplete>
</template>
