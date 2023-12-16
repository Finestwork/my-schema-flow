<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import BaseButton from '@components/Modules/TableRelation/Partials/BaseButton.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import { findNode } from '@utilities/CanvasHelper';
import { computed } from 'vue';
import type { TProps } from '@components/Modules/TableRelation/TableRelations.vue';

const props = defineProps<TProps>();
const canvasStore = useCanvasStore();
const getRelations = computed(() => {
    const ActiveNode = canvasStore.currentActiveNode;
    const currentActiveEdges = getNodeRelationship(ActiveNode, props.edges);

    return currentActiveEdges
        .map((edge) => {
            const SourceNode = findNode(edge.source, props.nodes);
            const TargetNode = findNode(edge.target, props.nodes);
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
</script>

<template>
    <div>
        <BaseButton
            v-for="relation in getRelations"
            :key="relation.id"
            class="mb-2 last-of-type:mb-0"
            type="button"
        >
            <template #table>{{ relation.table }}</template>
            <template #column>{{ relation.column }}</template>
            <template #relation>{{ relation.relation }}</template>
        </BaseButton>
        <VPanelActionButton class="mt-4">
            <template #icon>
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
