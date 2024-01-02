<script setup lang="ts">
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import EditIcon from '@components/Shared/Icons/EditIcon.vue';
import TrashIcon from '@components/Shared/Icons/TrashIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormCurrentTableLabel from '@components/Shared/Forms/PanelFormCurrentTableLabel.vue';
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedTable from '@components/Shared/Forms/PanelFormReferencedTable.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import PanelFormOnDeleteConstraint from '@components/Shared/Forms/PanelFormOnDeleteConstraint.vue';
import PanelFormOnUpdateConstraint from '@components/Shared/Forms/PanelFormOnUpdateConstraint.vue';
import { useTableRelationActions } from '@composables/Table/useTableRelationActions';
import { useCanvasStore } from '@stores/Canvas';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { validateTableRelations } from '@utilities/FormTableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { nextTick, ref, inject } from 'vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
    (e: 'goBack'): void;
}>();
const canvasStore = useCanvasStore();
const VueFlow = inject(vueFlowKey);
const errors: Ref<Array<string>> = ref([]);
const { updateRelation, deleteRelation } = useTableRelationActions();
const { createHistory } = useHistoryActions();

const referencingColumn = ref(
    canvasStore.currentActiveEdge.data.referencing.column,
);
const referencedTable = ref(
    canvasStore.currentActiveEdge.sourceNode.data.table.name,
);
const referencedColumn = ref(
    canvasStore.currentActiveEdge.data.referenced.column,
);
const onDeleteConstraint = ref(
    canvasStore.currentActiveEdge.data.constraint.onDelete,
);
const onUpdateConstraint = ref(
    canvasStore.currentActiveEdge.data.constraint.onUpdate,
);

const isSuccessfullyUpdated = ref(false);
const onClickHideForm = () => {
    canvasStore.currentActiveEdge = Object.assign({}, {});
    emits('goBack');
};
const onClickUpdateRelation = async () => {
    if (!VueFlow) return;
    errors.value = [];
    isSuccessfullyUpdated.value = false;
    // Defaults to NO ACTION if not set
    const RelationObj = {
        referencingColumn: referencingColumn.value,
        referencedTable: referencedTable.value,
        referencedColumn: referencedColumn.value,
        constraint: {
            onDelete: onDeleteConstraint.value,
            onUpdate: onUpdateConstraint.value,
        },
    };
    errors.value = validateTableRelations(
        RelationObj,
        canvasStore.currentActiveNode,
        VueFlow.getNodes.value,
        VueFlow.getEdges.value,
    );
    if (errors.value.length !== 0) return;
    updateRelation(RelationObj);
    await nextTick();
    const TableName = canvasStore.currentActiveNode.data.table.name;
    const Label = `Relationship Updated: '${TableName}' and '${referencedTable.value}'`;
    createHistory(Label);
    isSuccessfullyUpdated.value = true;
};
const onClickDeleteRelation = () => {
    const TableName = canvasStore.currentActiveEdge.targetNode.data.table.name;
    const Label = `Relationship Deleted: '${TableName}' and '${referencedTable.value}'`;
    createHistory(Label);
    deleteRelation();
    emits('goBack');
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
        <PanelBackButton class="mb-4 mt-2" @click="onClickHideForm" />
        <PanelFormCurrentTableLabel class="mb-4" />
        <PanelFormReferencingColumn v-model="referencingColumn" class="mb-4" />
        <PanelFormReferencedTable v-model="referencedTable" class="mb-4" />
        <PanelFormReferencedColumn
            v-model="referencedColumn"
            v-model:referenced-table="referencedTable"
            class="mb-5"
            :disabled="referencedTable.trim() === ''"
        />
        <PanelFormOnDeleteConstraint
            v-model="onDeleteConstraint"
            class="mb-2"
        />
        <PanelFormOnUpdateConstraint
            v-model="onUpdateConstraint"
            class="mb-5"
        />

        <VPanelActionButton class="mb-2" @click="onClickUpdateRelation">
            <template #icon>
                <EditIcon />
            </template>
            <template #text>Update Relation</template>
        </VPanelActionButton>
        <VPanelActionButton
            color-scheme="danger"
            @click="onClickDeleteRelation"
        >
            <template #icon>
                <TrashIcon />
            </template>
            <template #text>Delete Relation</template>
        </VPanelActionButton>
    </div>
</template>
