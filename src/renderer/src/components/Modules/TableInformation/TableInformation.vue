<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import NoTableSelected from '@components/Shared/EmptyStates/NoTableSelected.vue';
import DefaultContent from '@components/Modules/TableInformation/Partials/DefaultContent.vue';
import FormContentAdd from '@components/Modules/TableInformation/Partials/FormContentAdd.vue';
import FormContentEdit from '@components/Modules/TableInformation/Partials/FormContentEdit.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import type { TUpdateColumn } from '@composables/useTableRelation';

const canvasStore = useCanvasStore();
const { displayAddColumnForm, displayEditColumnForm, currentColumnIndex } =
    defineModels<{
        displayAddColumnForm: boolean;
        displayEditColumnForm: boolean;
        currentColumnIndex: number;
    }>();
const emits = defineEmits<{
    (e: 'updateColumnRelation', value: TUpdateColumn): void;
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
                    @update-column-relation="
                        emits('updateColumnRelation', $event)
                    "
                />
            </div>
            <NoTableSelected v-else />
        </template>
    </VPanelSectionWrapper>
</template>
