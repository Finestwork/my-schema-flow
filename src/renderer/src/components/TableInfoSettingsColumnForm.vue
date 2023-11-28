<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import BaseAlertErrorList from '@components/BaseAlertErrorList.vue';
import BaseFormAutoCompleteWithDescription from '@components/BaseFormAutoCompleteWithDescription.vue';
import TableInfoBackButton from '@components/TableInfoBackButton.vue';
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import TableInfoTextInputNumber from '@components/TableInfoTextInputNumber.vue';
import TableInfoCheckbox from '@components/TableInfoCheckbox.vue';
import { getAutocomplete } from '@composables/useMysqlDataType';
import { addColumn, validateColumns } from '@composables/useTableColumn';
import { ref, reactive, computed } from 'vue';
import type { Ref } from 'vue';
import type { TTableColumn } from '@stores/TableStore';

const emits = defineEmits(['goBack']);
const autocompleteSearchTerm = ref('');
const columnErrors: Ref<string[]> = ref([]);
const columnData: TTableColumn = reactive({
    name: '',
    type: '',
    length: '',
    isNull: false,
    keyConstraint: '',
});
const { contents: mysqlDataTypesArr } = getAutocomplete(autocompleteSearchTerm);
const getColumnErrors = computed(() => {
    return columnErrors.value.map((column) => `• ${column}`);
});
const onInputUpdateAutocomplete = (e: KeyboardEvent) => {
    const Target = <HTMLInputElement>e.target;
    autocompleteSearchTerm.value = Target.value;
};
const onClickAddColumn = () => {
    columnErrors.value = validateColumns(columnData);
    if (columnErrors.value.length !== 0) return;
    addColumn(columnData);
};
</script>

<template>
    <div class="mt-4">
        <TableInfoBackButton class="mb-6" @click="emits('goBack')" />
        <BaseAlertErrorList
            class="mb-2"
            color-scheme="danger"
            v-if="getColumnErrors.length !== 0"
            :items="getColumnErrors"
        />
        <TableInfoTextInput
            class="mb-4"
            id="tableSettingsColumnName"
            placeholder="Place column's name here"
            v-model="columnData.name"
        >
            <template #label>Column name:</template>
        </TableInfoTextInput>

        <TableInfoTextInputNumber
            class="mb-4"
            id="tableSettingsColumnLength"
            placeholder="Place data size here"
            v-model="columnData.length"
        >
            <template #label>Length:</template>
        </TableInfoTextInputNumber>
        <BaseFormAutoCompleteWithDescription
            :items="mysqlDataTypesArr"
            v-model="columnData.type"
            @input="onInputUpdateAutocomplete"
        />
        <TableInfoCheckbox id="tableSettingsColumnNull" value="isNull" v-model="columnData.isNull">
            <template #label>Null</template>
        </TableInfoCheckbox>

        <button
            class="group mt-6 flex w-full items-center justify-center rounded py-2.5 outline-none dark:bg-dark-700 dark:hover:bg-blue-600/10 dark:focus:bg-blue-600/10"
            type="button"
            @click="onClickAddColumn"
        >
            <span class="mr-1 block w-[10px]">
                <IconAdd
                    class="group-hover:stroke-blue-500 group-focus:stroke-blue-600 dark:stroke-slate-300"
                />
            </span>
            <span
                class="text-xs font-semibold group-hover:text-blue-500 group-focus:text-blue-500 dark:text-slate-300"
                >Add Column</span
            >
        </button>
    </div>
</template>
