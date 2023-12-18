<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import BaseButton from '@components/Modules/TableRelation/Partials/BaseButton.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { findNode, getNodeRelationship } from '@utilities/CanvasHelper';
import { getEdgesKey, getNodesKey } from '@symbols/Canvas';
import { computed, inject } from 'vue';

const emits = defineEmits<{
    (e: 'addForm', value: Event): void;
    (e: 'editForm'): void;
}>();
const canvasStore = useCanvasStore();
const canvasEdges = inject(getEdgesKey);
const canvasNodes = inject(getNodesKey);
const getRelations = computed(() => {
    const ActiveNode = canvasStore.currentActiveNode;
    const currentActiveEdges = getNodeRelationship(
        ActiveNode,
        canvasEdges?.value,
    );

    return currentActiveEdges
        .map((edge) => {
            const SourceNode = findNode(edge.source, canvasNodes?.value);
            const TargetNode = findNode(edge.target, canvasNodes?.value);
            const IsParent = edge.target === ActiveNode.id;

            const Table = IsParent
                ? SourceNode.data.table.name
                : TargetNode.data.table.name;
            const Column = IsParent
                ? edge.data.referencing.column
                : edge.data.referenced.column;
            return {
                id: edge.id,
                table: Table,
                column: Column,
                relation: IsParent ? 'Parent' : 'Child',
                isCurrentNodeParent: IsParent,
            };
        })
        .sort((edge) => {
            return edge.isCurrentNodeParent ? 1 : -1;
        });
});
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
            v-for="relation in getRelations"
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
