<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableInformationSection/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableInformationSection/Partials/AddForm.vue';
import EditForm from '@components/Modules/TableInformationSection/Partials/EditForm.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import { useCanvasStore } from '@stores/Canvas';
import { ref, watch } from 'vue';

const canvasStore = useCanvasStore();
const displayAddForm = ref(false);

watch(
    () => canvasStore.currentActiveNode,
    () => {
        canvasStore.currentNodeActiveColumnIndex = -1;
        displayAddForm.value = false;
    },
);
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="
                        !displayAddForm &&
                        canvasStore.currentNodeActiveColumnIndex === -1
                    "
                    v-model:current-column-index="
                        canvasStore.currentNodeActiveColumnIndex
                    "
                    @add-column="displayAddForm = true"
                />
                <AddForm
                    v-if="
                        displayAddForm &&
                        canvasStore.currentNodeActiveColumnIndex === -1
                    "
                    @hide-form="displayAddForm = false"
                />
                <EditForm
                    v-if="
                        !displayAddForm &&
                        canvasStore.currentNodeActiveColumnIndex !== -1
                    "
                    @hide-form="canvasStore.currentNodeActiveColumnIndex = -1"
                />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
