<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import DefaultContent from '@components/Modules/TableInformationSection/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableInformationSection/Partials/AddForm.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import { useCanvasStore } from '@stores/Canvas';
import { ref } from 'vue';

const canvasStore = useCanvasStore();
const currentColumnIndex = ref(-1);
const displayAddForm = ref(false);
</script>
<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="!displayAddForm"
                    :current-column-index="currentColumnIndex"
                    @add-column="displayAddForm = true"
                />
                <AddForm
                    v-if="displayAddForm"
                    @hide-form="displayAddForm = false"
                />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
