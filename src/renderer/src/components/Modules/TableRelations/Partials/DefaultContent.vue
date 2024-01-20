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
const VueFlow = inject(vueFlowKey);
const { relationList } = useTableRelationList();

const onClickEditForm = (edgeId: string) => {
    if (!VueFlow) return;
    // No need to create shallow copy
    const Edge = VueFlow.getEdges.value.find((edge) => edge.id === edgeId);
    canvasStore.currentActiveEdge = Edge ? Edge : {};
    emits('editForm');
};
</script>

<template>
    <div>
        <div v-if="relationList.length !== 0" class="mb-4">
            <VPanelRelationButton
                v-for="relation in relationList"
                :key="relation.id"
                class="mb-2 last-of-type:mb-0"
                type="button"
                @dblclick="onClickEditForm(relation.id)"
            >
                <template #table>{{ relation.table }}</template>
                <template #column>{{ relation.column }}</template>
                <template #relation>{{ relation.relation }}</template>
            </VPanelRelationButton>
        </div>
        <VPanelActionButton @click="emits('addForm', $event)">
            <template #icon="">
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
