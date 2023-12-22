<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import VPanelRelationButton from '@components/Base/Buttons/VPanelRelationButton.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useTableRelationList } from '@composables/Table/useTableRelationList';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

const emits = defineEmits<{
    (e: 'addForm', value: Event): void;
    (e: 'editForm'): void;
}>();
const canvasStore = useCanvasStore();
const { getEdges } = inject(vueFlowKey);
const { relationList } = useTableRelationList();

const onClickEditForm = (edgeId: string, relation: string) => {
    canvasStore.currentActiveEdge = getEdges.value.find(
        (edge) => edge.id === edgeId,
    ); // No need to create shallow copy

    // If the current active column is a child, make it the active node
    // So it will be highlighted once successfully updated the column
    if (relation === 'Child') {
        canvasStore.currentActiveNode =
            canvasStore.currentActiveEdge.targetNode;
    }

    emits('editForm');
};
</script>

<template>
    <div>
        <VPanelRelationButton
            v-for="relation in relationList"
            :key="relation.id"
            class="mb-2 last-of-type:mb-0"
            type="button"
            @dblclick="onClickEditForm(relation.id, relation.relation)"
        >
            <template #table>{{ relation.table }}</template>
            <template #column>{{ relation.column }}</template>
            <template #relation>{{ relation.relation }}</template>
        </VPanelRelationButton>
        <VPanelActionButton class="mt-4" @click="emits('addForm', $event)">
            <template #icon="">
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
