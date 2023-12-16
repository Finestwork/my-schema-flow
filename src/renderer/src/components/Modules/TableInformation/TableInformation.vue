<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableInformation/Partials/DefaultContent.vue';
import FormContentAdd from '@components/Modules/TableInformation/Partials/FormContentAdd.vue';
import FormContentEdit from '@components/Modules/TableInformation/Partials/FormContentEdit.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { ref } from 'vue';

const canvasStore = useCanvasStore();
const { displayAddColumnForm, displayEditColumnForm, currentColumnIndex } =
    defineModels<{
        displayAddColumnForm: boolean;
        displayEditColumnForm: boolean;
        currentColumnIndex: number;
    }>();
</script>
<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="!displayAddColumnForm && !displayEditColumnForm"
                    v-model:current-column-index="currentColumnIndex"
                    @add-column="displayAddColumnForm = true"
                    @edit-column="displayEditColumnForm = true"
                />
                <FormContentAdd
                    v-if="displayAddColumnForm && !displayEditColumnForm"
                    v-model:display-form="displayAddColumnForm"
                />
                <FormContentEdit
                    v-if="!displayAddColumnForm && displayEditColumnForm"
                    v-model:display-form="displayEditColumnForm"
                    v-model:current-column-index="currentColumnIndex"
                />
            </div>
        </template>
    </VPanelSectionWrapper>
</template>
