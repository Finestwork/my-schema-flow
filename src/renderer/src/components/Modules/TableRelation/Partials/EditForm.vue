<script setup lang="ts">
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormCurrentTableLabel from '@components/Shared/Forms/PanelFormCurrentTableLabel.vue';
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedTable from '@components/Shared/Forms/PanelFormReferencedTable.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { getNodesKey, getEdgesKey } from '@symbols/Canvas';
import { validateTableRelations } from '@utilities/FormTableHelper';
import { nextTick, ref, inject } from 'vue';
import type { Ref } from 'vue';
import type { TRelationFormData } from '@composables/useTableRelation';
import type { TEditEdgeData } from '@components/Modules/TableRelation/Partials/DefaultContent.vue';

const props = defineProps<TEditEdgeData>();
const emits = defineEmits<{
    (e: 'goBack'): void;
    (e: 'editRelation', data: TRelationFormData): void;
}>();
const canvasStore = useCanvasStore();
const errors: Ref<Array<string>> = ref([]);
const getNodes = inject(getNodesKey);
const getEdges = inject(getEdgesKey);
const currentEdge = getEdges.value.find((edge) => edge.id === props.id);
const referencingColumn = ref(currentEdge.data.referencing.column);
const referencedTable = ref(currentEdge.sourceNode.data.table.name);
const referencedColumn = ref(currentEdge.data.referenced.column);
const isSuccessfullyUpdated = ref(false);
const onClickEditRelation = async () => {
    errors.value = [];
    isSuccessfullyUpdated.value = false;
    const RelationObj = {
        referencingColumn: referencingColumn.value,
        referencedTable: referencedTable.value,
        referencedColumn: referencedColumn.value,
    };
    errors.value = validateTableRelations(
        RelationObj,
        canvasStore.currentActiveNode,
        getNodes.value,
    );
    if (errors.value.length !== 0) return;
    emits('editRelation', RelationObj);
    await nextTick();
    isSuccessfullyUpdated.value = true;
};
</script>

<template>
    <div>
        <VAlertList
            v-if="errors.length !== 0"
            class="my-4"
            type="danger"
            :items="errors"
        />
        <VAlert v-if="isSuccessfullyUpdated" class="my-4">
            You have successfully updated a table relation!
        </VAlert>
        <PanelBackButton class="mb-4 mt-2" @click="emits('goBack')" />
        <PanelFormCurrentTableLabel class="mb-2" />
        <PanelFormReferencingColumn v-model="referencingColumn" class="mb-2" />
        <PanelFormReferencedTable v-model="referencedTable" class="mb-2" />
        <PanelFormReferencedColumn
            v-model="referencedColumn"
            v-model:referenced-table="referencedTable"
            class="mb-5"
            :disabled="referencedTable.trim() === ''"
        />
        <VPanelActionButton @click="onClickEditRelation">
            <template #icon>
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
