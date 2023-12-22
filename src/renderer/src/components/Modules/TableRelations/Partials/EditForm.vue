<script setup lang="ts">
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import EditIcon from '@components/Shared/Icons/EditIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormCurrentTableLabel from '@components/Shared/Forms/PanelFormCurrentTableLabel.vue';
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedTable from '@components/Shared/Forms/PanelFormReferencedTable.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import { useTableRelationActions } from '@composables/Table/useTableRelationActions';
import { useCanvasStore } from '@stores/Canvas';
import { vueFlowKey } from '@symbols/VueFlow';
import { validateTableRelations } from '@utilities/FormTableHelper';
import { nextTick, ref, inject } from 'vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
    (e: 'goBack'): void;
}>();
const canvasStore = useCanvasStore();
const errors: Ref<Array<string>> = ref([]);
const { updateRelation } = useTableRelationActions();
const { getNodes } = inject(vueFlowKey);

const referencingColumn = ref(
    canvasStore.currentActiveEdge.data.referencing.column,
);
const referencedTable = ref(
    canvasStore.currentActiveEdge.sourceNode.data.table.name,
);
const referencedColumn = ref(
    canvasStore.currentActiveEdge.data.referenced.column,
);
const isSuccessfullyUpdated = ref(false);
const onClickUpdateRelation = async () => {
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
    updateRelation(RelationObj);
    await nextTick();
    isSuccessfullyUpdated.value = true;
};
const onClickHideForm = () => {
    canvasStore.currentActiveEdge = Object.assign({}, {});
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
        <PanelFormCurrentTableLabel class="mb-2" />
        <PanelFormReferencingColumn v-model="referencingColumn" class="mb-2" />
        <PanelFormReferencedTable v-model="referencedTable" class="mb-2" />
        <PanelFormReferencedColumn
            v-model="referencedColumn"
            v-model:referenced-table="referencedTable"
            class="mb-5"
            :disabled="referencedTable.trim() === ''"
        />
        <VPanelActionButton @click="onClickUpdateRelation">
            <template #icon>
                <EditIcon />
            </template>
            <template #text>Update Relation</template>
        </VPanelActionButton>
    </div>
</template>