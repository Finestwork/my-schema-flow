<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import EditIcon from '@components/Shared/Icons/EditIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelColumnTypeForm from '@components/Shared/Forms/PanelFormType.vue';
import PanelFormColumnLength from '@components/Shared/Forms/PanelFormColumnLength.vue';
import PanelFormKeyConstraints from '@components/Shared/Forms/PanelFormKeyConstraints.vue';
import PanelFormNull from '@components/Shared/Forms/PanelFormNull.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { validateColumns } from '@utilities/FormTableHelper';
import { reactive, ref } from 'vue';

const { displayForm, currentColumnIndex } = defineModels<{
    displayForm: boolean;
    currentColumnIndex: number;
}>();
const canvasStore = useCanvasStore();
const column = Object.assign(
    {},
    canvasStore.currentActiveNode.data.table.columns[currentColumnIndex.value],
);
const errors = ref([]);
const isSuccessfullyCreated = ref(false);
const formStates = reactive({
    name: column?.name ?? '',
    type: column?.type ?? '',
    length: column?.length ?? '',
    keyConstraint: column?.keyConstraint ?? '',
    isNull: column?.isNull ?? false,
});
const onClickUpdateColumn = () => {
    errors.value = [];
    isSuccessfullyCreated.value = false;
    errors.value = validateColumns(formStates, canvasStore.currentActiveNode);
    if (errors.value.length !== 0) return;
    canvasStore.updateColumnInActiveNode(formStates, currentColumnIndex.value);
    isSuccessfullyCreated.value = true;
};
const onClickRedirectBack = () => {
    displayForm.value = false;
    currentColumnIndex.value = -1;
};
</script>
<template>
    <div class="mt-3">
        <PanelBackButton @click="onClickRedirectBack" />
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
            <PanelColumnTypeForm v-model="formStates.type" class="mb-3" />
            <PanelFormColumnLength v-model="formStates.length" class="mb-3" />
            <PanelFormNull v-model="formStates.isNull" class="mb-3" />
            <PanelFormKeyConstraints
                v-model="formStates.keyConstraint"
                class="mb-6"
            />
            <VPanelActionButton @click="onClickUpdateColumn">
                <template #icon>
                    <EditIcon />
                </template>
                <template #text>Update Column</template>
            </VPanelActionButton>
        </div>
    </div>
</template>
