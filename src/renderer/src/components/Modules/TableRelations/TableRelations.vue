<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import DefaultContent from '@components/Modules/TableRelations/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableRelations/Partials/AddForm.vue';
import EditForm from '@components/Modules/TableRelations/Partials/EditForm.vue';
import { useCanvasStore } from '@stores/Canvas';
import { ref, watch } from 'vue';
import type { TRelationFormData } from '@composables/Table/useTableRelationActions';

const emits = defineEmits<{
    (e: 'addRelation', data: TRelationFormData): void;
    (e: 'updateRelation', data: TRelationFormData): void;
}>();
const canvasStore = useCanvasStore();
const displayAddForm = ref(false);
const displayEditForm = ref(false);
watch(
    () => canvasStore.currentActiveNode,
    () => {
        displayAddForm.value = false;
        displayEditForm.value = false;
        canvasStore.currentActiveEdge = Object.assign({}, {});
    },
);
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Table Relation</template>
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
