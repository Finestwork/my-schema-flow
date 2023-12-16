<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelColumnTypeForm from '@components/Shared/Forms/PanelFormType.vue';
import PanelFormColumnLength from '@components/Shared/Forms/PanelFormColumnLength.vue';
import PanelFormKeyConstraints from '@components/Shared/Forms/PanelFormKeyConstraints.vue';
import PanelFormNull from '@components/Shared/Forms/PanelFormNull.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { validateColumns } from '@utilities/FormTableHelper';
import { reactive, ref } from 'vue';

const { displayForm } = defineModels<{
    displayForm: boolean;
}>();
const canvasStore = useCanvasStore();
const errors = ref([]);
const formStates = reactive({
    name: '',
    type: '',
    length: '',
    keyConstraint: '',
    isNull: false,
});
const onClickAddColumn = () => {
    errors.value = validateColumns(formStates, canvasStore);
};
</script>
<template>
    <div class="mt-3">
        <PanelBackButton @click="displayForm = false" />
        <div class="mt-4">
            <VAlertList
                v-if="errors.length !== 0"
                type="danger"
                class="mb-2.5 mt-6"
                :items="errors"
            />
            <PanelFormColumnName v-model="formStates.name" class="mb-3" />
            <PanelColumnTypeForm v-model="formStates.type" class="mb-3" />
            <PanelFormColumnLength v-model="formStates.length" class="mb-3" />
            <PanelFormNull v-model="formStates.isNull" class="mb-3" />
            <PanelFormKeyConstraints
                v-model="formStates.keyConstraint"
                class="mb-6"
            />
            <VPanelActionButton @click="onClickAddColumn">
                <template #icon>
                    <AddIcon />
                </template>
                <template #text>Add Column</template>
            </VPanelActionButton>
        </div>
    </div>
</template>
