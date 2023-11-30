<script setup lang="ts">
import BaseFormAutoComplete from '@components/BaseFormAutoComplete.vue';
import BaseFormAutoCompleteItem from '@components/BaseFormAutoCompleteItem.vue';
import { useTableStore } from '@stores/TableStore';
import { computed, reactive, watch } from 'vue';

const tableStore = useTableStore();
const states = reactive({
    attribute: '',
    attributeSearchTerm: '',
    showAttributeDropdown: false,
});
const getAttributes = computed(() =>
    tableStore.getAttributesOfCurrentActiveNode.filter((attr) =>
        attr.toLowerCase().includes(states.attributeSearchTerm.toLowerCase()),
    ),
);
const onKeydownChooseAttribute = (e: KeyboardEvent, value: string) => {
    if (e.key.toLowerCase() !== 'enter') return;
    states.attribute = value;
    states.showAttributeDropdown = false;
};
const onClickChooseAttribute = (value: string) => {
    states.attribute = value;
    states.showAttributeDropdown = false;
};

watch(
    () => states.attribute,
    (attr) => {
        states.attributeSearchTerm = attr;
    },
);
</script>

<template>
    <div>
        <BaseFormAutoComplete
            id="tableInfo"
            placeholder="Place table's attribute here"
            v-model="states.attribute"
            v-model:show-dropdown="states.showAttributeDropdown"
            :items="getAttributes"
        >
            <template #label>Attribute:</template>
            <template #float>
                <div class="scrollbar-slim">
                    <BaseFormAutoCompleteItem
                        v-for="attr in getAttributes"
                        @keydown="onKeydownChooseAttribute($event, attr)"
                        @click="onClickChooseAttribute(attr)"
                    >
                        {{ attr }}
                    </BaseFormAutoCompleteItem>
                </div>
            </template>
        </BaseFormAutoComplete>
        <!--        <TableInfoTextInput id="" placeholder="" v-model="states.references">-->
        <!--            <template #label>Referenced Table:</template>-->
        <!--        </TableInfoTextInput>-->
        <!--        <TableInfoTextInput id="" placeholder="" v-model="states.references">-->
        <!--            <template #label>Referenced table attribute:</template>-->
        <!--        </TableInfoTextInput>-->
    </div>
</template>
