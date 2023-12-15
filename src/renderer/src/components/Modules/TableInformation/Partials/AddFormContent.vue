<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelColumnTypeForm from '@components/Shared/Forms/PanelColumnTypeForm.vue';
import PanelFormColumnLength from '@components/Shared/Forms/PanelFormColumnLength.vue';
import PanelFormKeyConstraints from '@components/Shared/Forms/PanelFormKeyConstraints.vue';
import { reactive, ref } from 'vue';

const { displayForm } = defineModels<{
    displayForm: boolean;
}>();
const formStates = reactive({
    name: '',
    type: '',
    length: '',
    keyConstraint: '',
});
</script>
<template>
    <div class="mt-3">
        <PanelBackButton @click="displayForm = false" />
        <div class="mt-4">
            <PanelFormColumnName v-model="formStates.name" class="mb-2" />
            <PanelColumnTypeForm v-model="formStates.type" class="mb-2" />
            <PanelFormColumnLength v-model="formStates.length" class="mb-2" />
            <PanelFormKeyConstraints
                v-model="formStates.keyConstraint"
                class="mb-6"
            />
            <VPanelActionButton>
                <template #icon>
                    <AddIcon />
                </template>
                <template #text>Add Column</template>
            </VPanelActionButton>
        </div>
    </div>
</template>
