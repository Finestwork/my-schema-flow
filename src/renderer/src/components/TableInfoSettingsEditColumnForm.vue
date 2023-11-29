<script setup lang="ts">
import IconEdit from '@components/IconEdit.vue';
import BaseAlertErrorList from '@components/BaseAlertErrorList.vue';
import BaseFormAutoCompleteWithDescription from '@components/BaseFormAutoCompleteWithDescription.vue';
import TableInfoBackButton from '@components/TableInfoBackButton.vue';
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import TableInfoTextInputNumber from '@components/TableInfoTextInputNumber.vue';
import TableInfoCheckbox from '@components/TableInfoCheckbox.vue';
import TableInfoButtonSelect from '@components/TableInfoButtonSelect.vue';
import { getAutocomplete } from '@composables/useMysqlDataType';
import { useColumnActions } from '@composables/useColumnActions';
import { useTableStore } from '@stores/TableStore';
import { ref, reactive, computed } from 'vue';
import type { TTableColumnCreation } from '@stores/TableStore';

const { currentActiveIndex } = defineProps<{
    currentActiveIndex: number;
}>();
const emits = defineEmits(['goBack']);
const tableStore = useTableStore();
const CurrentColumn = tableStore.currentActiveNode.data.table.columns[currentActiveIndex];
const autocompleteSearchTerm = ref('');
const columnErrors = ref([]);
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
const onInputUpdateAutocomplete = (e: KeyboardEvent) => {
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
        <button
            class="group mt-6 flex w-full items-center justify-center rounded py-2.5 outline-none dark:bg-dark-700 dark:hover:bg-blue-600/10 dark:focus:bg-blue-600/10"
            type="button"
            @click="onClickAddColumn"
        >
            <span class="mr-1 block w-[10px]">
                <IconEdit
                    class="group-hover:stroke-blue-500 group-focus:stroke-blue-600 dark:stroke-slate-300"
                />
            </span>
            <span
                class="text-xs font-semibold group-hover:text-blue-500 group-focus:text-blue-500 dark:text-slate-300"
                >Update Column</span
            >
        </button>
    </div>
</template>
