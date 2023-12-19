<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import BaseButton from '@components/Modules/TableRelation/Partials/BaseButton.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { useTableRelationList } from '@composables/useTableRelationList';
import { getEdgesKey, getNodesKey } from '@symbols/Canvas';
import { inject } from 'vue';

const emits = defineEmits<{
    (e: 'addForm', value: Event): void;
    (e: 'editForm'): void;
}>();
const canvasStore = useCanvasStore();
const canvasEdges = inject(getEdgesKey);
const canvasNodes = inject(getNodesKey);
const { relationList } = useTableRelationList(canvasEdges, canvasNodes);

const onClickEditForm = (edgeId: string) => {
    canvasStore.currentActiveEdge = canvasEdges?.value.find(
        (edge) => edge.id === edgeId,
    ); // No need to create shallow copy
    emits('editForm');
};
</script>

<template>
    <div>
        <BaseButton
            v-for="relation in relationList"
            :key="relation.id"
            class="mb-2 last-of-type:mb-0"
            type="button"
            @dblclick="onClickEditForm(relation.id)"
        >
            <template #table>{{ relation.table }}</template>
            <template #column>{{ relation.column }}</template>
            <template #relation>{{ relation.relation }}</template>
        </BaseButton>
        <VPanelActionButton class="mt-4" @click="emits('addForm', $event)">
            <template #icon="">
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
