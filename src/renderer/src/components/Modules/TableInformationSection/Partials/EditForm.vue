<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import EditIcon from '@components/Shared/Icons/EditIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelFormColumnType from '@components/Shared/Forms/PanelFormColumnType.vue';
import PanelFormColumnLength from '@components/Shared/Forms/PanelFormColumnLength.vue';
import PanelFormKeyConstraints from '@components/Shared/Forms/PanelFormKeyConstraints.vue';
import PanelFormNull from '@components/Shared/Forms/PanelFormNull.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useUpdateEdgeData } from '@composables/Edges/useUpdateEdgeData';
import { validateColumns } from '@utilities/FormTableHelper';
import { reactive, ref } from 'vue';
import type { TUpdateColumn } from '@composables/Table/useTableRelationActions';

const props = defineProps<{
    currentColumnIndex: number;
}>();
const emits = defineEmits<{
    (e: 'hideForm', value: MouseEvent): void;
    (e: 'updateColumnRelation', value: TUpdateColumn): void;
}>();
const canvasStore = useCanvasStore();
const column = Object.assign(
    {},
    canvasStore.currentActiveNode.data.table.columns[props.currentColumnIndex],
);
const errors = ref([]);
const isSuccessfullyCreated = ref(false);
const formStates = reactive({
    name: column?.name ?? '',
    originalColumnName: column?.name ?? '',
    type: column?.type ?? '',
    length: column?.length ?? '',
    keyConstraint: column?.keyConstraint ?? '',
    isNull: column?.isNull ?? false,
});
const { updateColumnBasedOnActiveNode } = useUpdateEdgeData();
const onClickUpdateColumn = () => {
    errors.value = [];
    isSuccessfullyCreated.value = false;
    errors.value = validateColumns(formStates, canvasStore.currentActiveNode);
    if (errors.value.length !== 0) return;
    emits('updateColumnRelation', {
        originalName: formStates.originalColumnName,
        newName: formStates.name,
    });
    updateColumnBasedOnActiveNode(formStates.name);
    formStates.originalColumnName = formStates.name;
    canvasStore.updateColumnInActiveNode(formStates, props.currentColumnIndex);
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
            <PanelFormColumnName v-model="formStates.name" class="mb-3" />
            <PanelFormColumnType v-model="formStates.type" class="mb-3" />
            <PanelFormColumnLength v-model="formStates.length" class="mb-3" />
            <PanelFormNull v-model="formStates.isNull" class="mb-3" />
            <PanelFormKeyConstraints v-model="formStates.keyConstraint" />
            <VPanelActionButton class="mb-3 mt-6" @click="onClickUpdateColumn">
                <template #icon>
                    <EditIcon />
                </template>
                <template #text>Update Column</template>
            </VPanelActionButton>
        </div>
    </div>
</template>