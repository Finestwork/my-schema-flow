<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableInformationSection/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableInformationSection/Partials/AddForm.vue';
import EditForm from '@components/Modules/TableInformationSection/Partials/EditForm.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import { useCanvasStore } from '@stores/Canvas';
import { ref } from 'vue';

const canvasStore = useCanvasStore();
const currentColumnIndex = ref(-1);
const displayAddForm = ref(false);
const displayEditForm = ref(false);
const onClickDisplayEditForm = (index: number) => {
    displayEditForm.value = true;
    currentColumnIndex.value = index;
};
const onEditFormHide = () => {
    displayEditForm.value = false;
    currentColumnIndex.value = -1;
};
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="!displayAddForm && !displayEditForm"
                    v-model:current-column-index="currentColumnIndex"
                    @add-column="displayAddForm = true"
                    @edit-column="onClickDisplayEditForm"
                />
                <AddForm
                    v-if="displayAddForm && !displayEditForm"
                    @hide-form="displayAddForm = false"
                />
                <EditForm
                    v-if="!displayAddForm && displayEditForm"
                    :current-column-index="currentColumnIndex"
                    @hide-form="onEditFormHide"
                />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
