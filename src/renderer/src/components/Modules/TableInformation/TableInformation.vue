<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableInformation/Partials/DefaultContent.vue';
import AddFormContent from '@components/Modules/TableInformation/Partials/AddFormContent.vue';
import { useCanvasStore } from '@stores/CanvasStore';

const canvasStore = useCanvasStore();
const { displayAddColumnForm } = defineModels<{
    displayAddColumnForm: boolean;
}>();
</script>
<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="!displayAddColumnForm"
                    v-model:add-column="displayAddColumnForm"
                />
                <AddFormContent
                    v-if="displayAddColumnForm"
                    v-model:display-form="displayAddColumnForm"
                />
            </div>
        </template>
    </VPanelSectionWrapper>
</template>
