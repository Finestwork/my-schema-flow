<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import EditIcon from '@components/Shared/Icons/EditIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelFormColumnType from '@components/Shared/Forms/PanelFormColumnType.vue';
import PanelFormKeyConstraints from '@components/Shared/Forms/PanelFormKeyConstraints.vue';
import PanelFormNull from '@components/Shared/Forms/PanelFormNull.vue';
import PanelFormUnique from '@components/Shared/Forms/PanelFormUnique.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useUpdateEdgeData } from '@composables/Edges/useUpdateEdgeData';
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
    columnOriginalColumnName,
    columnType,
    columnKeyConstraint,
    columnIsNull,
    columnIsUnique,
} = useColumnData();
const { updateColumnBasedOnActiveNode } = useUpdateEdgeData();
const onClickUpdateColumn = () => {
    const ColumnData = {
        name: columnName.value,
        originalColumnName: columnOriginalColumnName.value,
        type: columnType.value,
        isNull: columnIsNull.value,
        isUnique: columnIsUnique.value,
        keyConstraint: columnKeyConstraint.value,
    };
    errors.value = [];
    isSuccessfullyCreated.value = false;
    errors.value = validateColumns(ColumnData, canvasStore.currentActiveNode);
    if (errors.value.length !== 0) return;
    ColumnData.type = formatColumnDataType(columnType.value);
    updateColumnBasedOnActiveNode(
        columnOriginalColumnName.value,
        columnName.value,
    );
    columnOriginalColumnName.value = columnName.value;
    canvasStore.currentNodeActiveColumnIndex =
        canvasStore.updateColumnInActiveNode(
            ColumnData,
            canvasStore.currentNodeActiveColumnIndex,
        );
    isSuccessfullyCreated.value = true;
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
                You have successfully updated a column!
            </VAlert>
            <PanelFormColumnName v-model="columnName" class="mb-3" />
            <PanelFormColumnType v-model="columnType" class="mb-3" />
            <PanelFormNull v-model="columnIsNull" class="mb-3" />
            <PanelFormUnique v-model="columnIsUnique" class="mb-3" />
            <PanelFormKeyConstraints v-model="columnKeyConstraint" />
            <VPanelActionButton class="mb-3 mt-6" @click="onClickUpdateColumn">
                <template #icon>
                    <EditIcon />
                </template>
                <template #text>Update Column</template>
            </VPanelActionButton>
        </div>
    </div>
</template>
