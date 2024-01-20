<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import DefaultContent from '@components/Modules/TableIndexes/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableIndexes/Partials/AddForm.vue';
import EditForm from '@components/Modules/TableIndexes/Partials/EditForm.vue';
import { useCanvasStore } from '@stores/Canvas';
import { ref, watch } from 'vue';

const canvasStore = useCanvasStore();
const displayAddForm = ref(false);
const activeColumnIndex = ref(-1);

watch(
    () => canvasStore.currentActiveNode,
    () => {
        displayAddForm.value = false;
        activeColumnIndex.value = -1;
    },
);
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Table Indexes</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="!displayAddForm && activeColumnIndex === -1"
                    v-model:active-column-index="activeColumnIndex"
                    @add-form="displayAddForm = true"
                />
                <AddForm
                    v-if="displayAddForm && activeColumnIndex === -1"
                    @go-back="displayAddForm = false"
                />
                <EditForm
                    v-if="!displayAddForm && activeColumnIndex !== -1"
                    v-model:active-column-index="activeColumnIndex"
                />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
