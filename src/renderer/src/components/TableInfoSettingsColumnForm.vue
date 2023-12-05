<script setup lang="ts">
import BaseAlertErrorList from '@components/BaseAlertErrorList.vue';
import BaseFormAutoCompleteWithDescription from '@components/BaseFormAutoCompleteWithDescription.vue';
import IconAdd from '@components/IconAdd.vue';
import TableInfoBackButton from '@components/TableInfoBackButton.vue';
import TableInfoBaseButton from '@components/TableInfoBaseButton.vue';
import TableInfoButtonSelect from '@components/TableInfoButtonSelect.vue';
import TableInfoCheckbox from '@components/TableInfoCheckbox.vue';
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import TableInfoTextInputNumber from '@components/TableInfoTextInputNumber.vue';
import { useColumnActions } from '@composables/useColumnActions';
import { getAutocomplete } from '@composables/useMysqlDataType';
import type { TTableColumnCreation } from '@stores/TableStore';
import type { Ref } from 'vue';
import { computed, nextTick, reactive, ref } from 'vue';

const emits = defineEmits(['goBack']);
const autocompleteSearchTerm = ref('');
const columnErrors: Ref<string[]> = ref([]);
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
const onInputUpdateAutocomplete = (e: Event) => {
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
            v-if="getColumnErrors.length !== 0"
            class="mb-2"
            color-scheme="danger"
            :items="getColumnErrors"
        />
        <TableInfoTextInput
            id="tableSettingsColumnName"
            v-model="columnData.name"
            class="mb-4"
            placeholder="Place column's name here"
        >
            <template #label>Column name:</template>
        </TableInfoTextInput>

        <TableInfoTextInputNumber
            id="tableSettingsColumnLength"
            v-model="columnData.length"
            class="mb-4"
            placeholder="Place data size here"
        >
            <template #label>Length:</template>
        </TableInfoTextInputNumber>
        <BaseFormAutoCompleteWithDescription
            v-model="columnData.type"
            class="mb-4"
            :items="mysqlDataTypesArr"
            @input="onInputUpdateAutocomplete"
        />
        <TableInfoCheckbox
            id="tableSettingsColumnNull"
            v-model="columnData.isNull"
            class="mb-4"
            value="isNull"
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

        <TableInfoBaseButton class="mt-6" @click="onClickAddColumn">
            <template #icon>
                <IconAdd />
            </template>
            <template #text>Add Column</template>
        </TableInfoBaseButton>
    </div>
</template>
