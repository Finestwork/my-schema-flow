<script setup lang="ts">
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormCurrentTableLabel from '@components/Shared/Forms/PanelFormCurrentTableLabel.vue';
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedTable from '@components/Shared/Forms/PanelFormReferencedTable.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import PanelFormOnDeleteConstraint from '@components/Shared/Forms/PanelFormOnDeleteConstraint.vue';
import PanelFormOnUpdateConstraint from '@components/Shared/Forms/PanelFormOnUpdateConstraint.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useTableRelationActions } from '@composables/Table/useTableRelationActions';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { validateTableRelations } from '@utilities/FormTableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { nextTick, ref, inject } from 'vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
    (e: 'goBack'): void;
}>();
const canvasStore = useCanvasStore();
const errors: Ref<Array<string>> = ref([]);
const referencingColumn = ref('');
const referencedTable = ref('');
const referencedColumn = ref('');
const onDeleteConstraint = ref('');
const onUpdateConstraint = ref('');
const isSuccessfullyCreated = ref(false);
const VueFlow = inject(vueFlowKey);
const { addRelation } = useTableRelationActions();
const { createHistory } = useHistoryActions();
const onClickAddRelation = async () => {
    if (!VueFlow) return;
    errors.value = [];
    isSuccessfullyCreated.value = false;
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
        'add',
    );
    if (errors.value.length !== 0) return;
    addRelation({
        referencingColumn: referencingColumn.value,
        referencedTable: referencedTable.value,
        referencedColumn: referencedColumn.value,
        constraint: {
            onDelete: onDeleteConstraint.value,
            onUpdate: onUpdateConstraint.value,
        },
    });
    await nextTick();
    const TableName = canvasStore.currentActiveNode.data.table.name;
    const HistoryLabel = `Relationship Added: '${TableName}' and '${referencedTable.value}'`;
    createHistory(HistoryLabel);

    // Reset Fields
    referencingColumn.value = '';
    referencedTable.value = '';
    referencedColumn.value = '';
    onDeleteConstraint.value = '';
    onUpdateConstraint.value = '';
    isSuccessfullyCreated.value = true;
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
        <VAlert v-if="isSuccessfullyCreated" class="my-4">
            You have successfully added a new table relation!
        </VAlert>
        <PanelBackButton class="mb-4 mt-2" @click="emits('goBack')" />
        <PanelFormCurrentTableLabel class="mb-4" />
        <PanelFormReferencingColumn v-model="referencingColumn" class="mb-4" />
        <PanelFormReferencedTable v-model="referencedTable" class="mb-4" />
        <PanelFormReferencedColumn
            v-model="referencedColumn"
            v-model:referenced-table="referencedTable"
            class="mb-4"
            :disabled="referencedTable.trim() === ''"
        />
        <PanelFormOnDeleteConstraint
            v-model="onDeleteConstraint"
            class="mb-4"
        />

        <PanelFormOnUpdateConstraint
            v-model="onUpdateConstraint"
            class="mb-5"
        />

        <VPanelActionButton @click="onClickAddRelation">
            <template #icon>
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
