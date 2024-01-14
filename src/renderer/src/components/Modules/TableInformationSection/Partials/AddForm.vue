<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelFormColumnType from '@components/Shared/Forms/PanelFormColumnType.vue';
import PanelFormKeyConstraints from '@components/Shared/Forms/PanelFormKeyConstraints.vue';
import PanelFormNull from '@components/Shared/Forms/PanelFormNull.vue';
import PanelFormUnique from '@components/Shared/Forms/PanelFormUnique.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useSortTableColumns } from '@composables/Table/useSortTableColumns';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useColumnData } from '@composables/Table/useColumnData';
import { validateColumns } from '@utilities/FormTableHelper';
import { formatColumnDataType } from '@utilities/TableHelper';
import { ref } from 'vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
    (e: 'hideForm', value: MouseEvent): void;
}>();
const canvasStore = useCanvasStore();
const errors: Ref<Array<string>> = ref([]);
const isSuccessfullyCreated = ref(false);
const {
    columnName,
    columnType,
    columnIsNull,
    columnIsUnique,
    columnKeyConstraint,
    fullResetData,
} = useColumnData();
const { sortPrimaryKey } = useSortTableColumns();
const { createHistory } = useHistoryActions();
const onClickAddColumn = () => {
    errors.value = [];
    isSuccessfullyCreated.value = false;
    const ColumnData = {
        name: columnName.value,
        type: columnType.value,
        isNull: columnIsNull.value,
        isUnique: columnIsUnique.value,
        keyConstraint: columnKeyConstraint.value,
    };
    errors.value = validateColumns(ColumnData, canvasStore.currentActiveNode);
    if (errors.value.length !== 0) return;
    columnType.value = formatColumnDataType(columnType.value);
    const TableName = canvasStore.currentActiveNode.data.table.name;
    createHistory(`Column Added: ${columnName.value} in '${TableName}' table`);
    canvasStore.addColumnInActiveNode(ColumnData);
    isSuccessfullyCreated.value = true;
    fullResetData();
    sortPrimaryKey();
};
</script>

<template>
    <div class="mt-3">
        <PanelBackButton @click="emits('hideForm', $event)" />
        <div class="mt-4">
            <VAlertList
                v-if="errors.length !== 0"
                type="danger"
                class="mb-2.5 mt-6"
                :items="errors"
            />
            <VAlert v-if="isSuccessfullyCreated" class="mb-2.5 mt-6">
                You have successfully added a new column!
            </VAlert>
            <PanelFormColumnName v-model="columnName" class="mb-3" />
            <PanelFormColumnType v-model="columnType" class="mb-3" />
            <PanelFormNull v-model="columnIsNull" class="mb-3" />
            <PanelFormUnique v-model="columnIsUnique" class="mb-3" />
            <PanelFormKeyConstraints v-model="columnKeyConstraint" />
            <VPanelActionButton class="mb-3 mt-6" @click="onClickAddColumn">
                <template #icon>
                    <AddIcon />
                </template>
                <template #text>Add Column</template>
            </VPanelActionButton>
        </div>
    </div>
</template>
