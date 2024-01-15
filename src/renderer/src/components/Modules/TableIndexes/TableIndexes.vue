<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import DefaultContent from '@components/Modules/TableIndexes/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableIndexes/Partials/AddForm.vue';
import EditForm from '@components/Modules/TableIndexes/Partials/EditForm.vue';
import { useCanvasStore } from '@stores/Canvas';
import { ref } from 'vue';

const canvasStore = useCanvasStore();
const displayAddForm = ref(false);
const displayEditForm = ref(false);
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Table Indexes</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="!displayAddForm && !displayEditForm"
                    @add-form="displayAddForm = true"
                    @edit-form="displayEditForm = true"
                />
                <AddForm
                    v-if="displayAddForm && !displayEditForm"
                    @go-back="displayAddForm = false"
                />
                <EditForm
                    v-if="!displayAddForm && displayEditForm"
                    @go-back="displayEditForm = false"
                />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
