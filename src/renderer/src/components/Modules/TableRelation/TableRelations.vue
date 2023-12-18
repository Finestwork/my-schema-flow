<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import DefaultContent from '@components/Modules/TableRelation/Partials/DefaultContent.vue';
import AddForm from '@components/Modules/TableRelation/Partials/AddForm.vue';
import EditForm from '@components/Modules/TableRelation/Partials/EditForm.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { ref, watch } from 'vue';
import type { TRelationFormData } from '@composables/useTableRelation';
import type { TEditEdgeData } from '@components/Modules/TableRelation/Partials/DefaultContent.vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
    (e: 'addRelation', data: TRelationFormData): void;
    (e: 'editRelation', data: TEditEdgeData): void;
}>();
const canvasStore = useCanvasStore();
const displayAddForm = ref(false);
const displayEditForm = ref(false);
const currentEdge: Ref<TEditEdgeData> = ref({});
const onClickHideRelationForm = () => {
    displayEditForm.value = false;
    Object.assign(currentEdge, {});
};
const onClickEditForm = (payload: TEditEdgeData) => {
    currentEdge.value = payload;
    displayEditForm.value = true;
};
watch(
    () => canvasStore.currentActiveNode,
    () => {
        displayAddForm.value = false;
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
                    @edit-form="onClickEditForm"
                />
                <AddForm
                    v-if="displayAddForm && !displayEditForm"
                    @go-back="displayAddForm = false"
                    @add-relation="emits('addRelation', $event)"
                />
                <EditForm
                    v-if="!displayAddForm && displayEditForm"
                    v-bind="currentEdge"
                    @go-back="onClickHideRelationForm"
                    @edit-relation="emits('editRelation', $event)"
                />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
