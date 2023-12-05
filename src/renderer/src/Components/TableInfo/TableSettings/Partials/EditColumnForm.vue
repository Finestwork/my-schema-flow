<script setup lang="ts">
import VAlertErrorList from '@components/Shared/Alerts/VAlertErrorList.vue';
import VEditIcon from '@components/Shared/Icons/VEditIcon.vue';
import FormAutoCompleteWithDescription from '@components/TableInfo/Shared/FormAutoCompleteWithDescription.vue';
import BackButton from '@components/TableInfo/Shared/BackButton.vue';
import BaseButton from '@components/TableInfo/Shared/BaseButton.vue';
import ButtonSelect from '@components/TableInfo/Shared/ButtonSelect.vue';
import Checkbox from '@components/TableInfo/Shared/Checkbox.vue';
import TextInput from '@components/TableInfo/Shared/TextInput.vue';
import TextInputNumber from '@components/TableInfo/Shared/TextInputNumber.vue';
import { useTableStore } from '@stores/TableStore';
import { useColumnActions } from '@composables/useColumnActions';
import { getAutocomplete } from '@composables/useMysqlDataType';
import { computed, reactive, ref } from 'vue';
import type { TTableColumnCreation } from '@stores/TableStore';
import type { Ref } from 'vue';

const { currentActiveIndex } = defineProps<{
    currentActiveIndex: number;
}>();
const emits = defineEmits(['goBack']);
const tableStore = useTableStore();
const autocompleteSearchTerm = ref('');
const columnErrors: Ref<Array<string>> = ref([]);
const CurrentColumn = tableStore.currentActiveNode.data.table.columns[currentActiveIndex];
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
        <BackButton class="mb-6" @click="emits('goBack')" />
        <VAlertErrorList
            v-if="getColumnErrors.length !== 0"
            class="mb-2"
            color-scheme="danger"
            :items="getColumnErrors"
        />
        <TextInput
            id="tableSettingsColumnName"
            v-model="columnData.name"
            class="mb-4"
            placeholder="Place column's name here"
        >
            <template #label>Column name:</template>
        </TextInput>

        <TextInputNumber
            id="tableSettingsColumnLength"
            v-model="columnData.length"
            class="mb-4"
            placeholder="Place data size here"
        >
            <template #label>Length:</template>
        </TextInputNumber>
        <FormAutoCompleteWithDescription
            v-model="columnData.type"
            class="mb-4"
            :items="mysqlDataTypesArr"
            @input="onInputUpdateAutocomplete"
        />
        <Checkbox
            id="tableSettingsColumnNull"
            v-model="columnData.isNull"
            class="mb-4"
            value="isNull"
        >
            <template #label>Null</template>
        </Checkbox>

        <div>
            <ButtonSelect
                class="mr-2"
                :is-active="keyConstraint === 'PK'"
                @click="onClickTogglePrimaryKey"
            >
                Primary Key
            </ButtonSelect>
            <ButtonSelect :is-active="keyConstraint === 'FK'" @click="onClickToggleForeignKey">
                Foreign Key
            </ButtonSelect>
        </div>
        <BaseButton class="mt-6" @click="onClickAddColumn">
            <template #icon>
                <VEditIcon />
            </template>
            <template #text> Update Column</template>
        </BaseButton>
    </div>
</template>
