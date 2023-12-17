<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import DefaultContent from '@components/Modules/TableRelation/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableRelation/Partials/AddForm.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { ref } from 'vue';

const canvasStore = useCanvasStore();
const displayAddForm = ref(false);
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Table Relation</template>
        <template #content>
            <div v-if="canvasStore.hasActiveNode">
                <DefaultContent
                    v-if="!displayAddForm"
                    @add-form="displayAddForm = true"
                />
                <AddForm v-if="displayAddForm" />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
