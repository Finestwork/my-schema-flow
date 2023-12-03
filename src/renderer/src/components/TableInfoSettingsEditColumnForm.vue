<script setup lang="ts">
import IconEdit from '@components/IconEdit.vue';
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
import { useTableStore } from '@stores/TableStore';
import { ref, reactive, computed } from 'vue';
import type { Ref } from 'vue';
import type { TTableColumnCreation } from '@stores/TableStore';

const { currentActiveIndex } = defineProps<{
    currentActiveIndex: number;
}>();
const emits = defineEmits(['goBack']);
const tableStore = useTableStore();
const CurrentColumn = tableStore.currentActiveNode.data.table.columns[currentActiveIndex];
const autocompleteSearchTerm = ref('');
const columnErrors: Ref<string[]> = ref([]);
const keyConstraint = ref(CurrentColumn?.keyConstraint ?? '');
const { activeColumnIndex, updateColumn, validateColumns } = useColumnActions();
const columnData: TTableColumnCreation = reactive({
    name: CurrentColumn?.name ?? '',
    type: CurrentColumn?.type ?? '',
    length: CurrentColumn?.length ?? '',
    isNull: CurrentColumn?.isNull ?? '',
    keyConstraint: CurrentColumn?.keyConstraint ?? '',
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
    activeColumnIndex.value = currentActiveIndex;
    updateColumn(columnData);
    columnErrors.value = [];
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
                <IconEdit />
            </template>
            <template #text> Update Column</template>
        </TableInfoBaseButton>
    </div>
</template>
