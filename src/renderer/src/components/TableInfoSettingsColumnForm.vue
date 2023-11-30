<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import BaseAlertErrorList from '@components/BaseAlertErrorList.vue';
import BaseFormAutoCompleteWithDescription from '@components/BaseFormAutoCompleteWithDescription.vue';
import TableInfoBackButton from '@components/TableInfoBackButton.vue';
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import TableInfoTextInputNumber from '@components/TableInfoTextInputNumber.vue';
import TableInfoCheckbox from '@components/TableInfoCheckbox.vue';
import TableInfoButtonSelect from '@components/TableInfoButtonSelect.vue';
import TableInfoBaseButton from '@components/TableInfoBaseButton.vue';
import { getAutocomplete } from '@composables/useMysqlDataType';
import { useColumnActions } from '@composables/useColumnActions';
import { ref, reactive, computed, nextTick } from 'vue';
import type { TTableColumnCreation } from '@stores/TableStore';

const emits = defineEmits(['goBack']);
const autocompleteSearchTerm = ref('');
const columnErrors = ref([]);
const keyConstraint = ref('');
const { addColumn, validateColumns } = useColumnActions();
const columnData: TTableColumnCreation = reactive({
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
const onClickAddColumn = async () => {
    columnErrors.value = validateColumns(columnData);
    if (columnErrors.value.length !== 0) return;
    addColumn(columnData);
    await nextTick();
    columnErrors.value = [];
    columnData.isNull = false;
    columnData.type = '';
    columnData.length = '';
    columnData.name = '';
    columnData.keyConstraint = '';
    keyConstraint.value = '';
};
const onClickTogglePrimaryKey = (e: MouseEvent) => {
    const Target = <HTMLButtonElement>e.currentTarget;
    Target.blur();
    keyConstraint.value = keyConstraint.value !== 'PK' ? 'PK' : '';
    columnData.keyConstraint = <'PK' | 'FK' | ''>keyConstraint.value;
};
const onClickToggleForeignKey = (e: MouseEvent) => {
    const Target = <HTMLButtonElement>e.currentTarget;
    Target.blur();
    keyConstraint.value = keyConstraint.value !== 'FK' ? 'FK' : '';
    columnData.keyConstraint = <'PK' | 'FK' | ''>keyConstraint.value;
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
            class="mb-4"
            :items="mysqlDataTypesArr"
            v-model="columnData.type"
            @input="onInputUpdateAutocomplete"
        />
        <TableInfoCheckbox
            class="mb-4"
            id="tableSettingsColumnNull"
            value="isNull"
            v-model="columnData.isNull"
        >
            <template #label>Null</template>
        </TableInfoCheckbox>

        <div>
            <TableInfoButtonSelect
                class="mr-2"
                :is-active="keyConstraint === 'PK'"
                @click="onClickTogglePrimaryKey"
            >
                Primary Key
            </TableInfoButtonSelect>
            <TableInfoButtonSelect
                :is-active="keyConstraint === 'FK'"
                @click="onClickToggleForeignKey"
            >
                Foreign Key
            </TableInfoButtonSelect>
        </div>

        <TableInfoBaseButton @click="onClickAddColumn">
            <template #icon>
                <IconAdd />
            </template>
            <template #text>Add Column</template>
        </TableInfoBaseButton>
    </div>
</template>
