<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import VPanelButtonIcon from '@components/Base/ButtonIcons/VPanelButtonIcon.vue';
import VPanelColumnButton from '@components/Base/Buttons/VPanelColumnButton.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import CopyIcon from '@components/Shared/Icons/CopyIcon.vue';
import TrashIcon from '@components/Shared/Icons/TrashIcon.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useTableRelationActions } from '@composables/Table/useTableRelationActions';
import { useSortTableColumns } from '@composables/Table/useSortTableColumns';
import { vueFlowKey } from '@symbols/VueFlow';
import { useDebounceFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { inject } from 'vue';

export type TColumnList = {
    name: string;
    type: string;
    keyConstraint: 'PK' | 'FK' | string;
};
const emits = defineEmits<{
    (e: 'addColumn', value: Event): void;
}>();
const canvasStore = useCanvasStore();
const { deleteRelationByColumn } = useTableRelationActions();
const { createHistory } = useHistoryActions();
const { sortPrimaryKey } = useSortTableColumns();
const VueFlow = inject(vueFlowKey);
const currentActiveIndex = ref(-1);
const getColumns = computed({
    get(): Array<TColumnList> {
        return canvasStore.displayColumnsOfActiveNode;
    },
    set(value) {
        canvasStore.currentActiveNode.data.table.columns = value;
    },
});
const canCloneColumn = computed(() => {
    if (!canvasStore.hasActiveNode || currentActiveIndex.value === -1)
        return false;
    const ActiveNode = canvasStore.currentActiveNode;
    const CurrentColumn =
        ActiveNode.data.table.columns[currentActiveIndex.value];

    return CurrentColumn.keyConstraint !== 'PK';
});
const isTableNameUnique = computed(() => {
    if (!VueFlow) return false;
    const CurrentActiveNode = canvasStore.currentActiveNode;
    const CurrentTableName = canvasStore.currentActiveNode.data.table.name;
    const Node = VueFlow.getNodes.value.find(
        (node) =>
            node.data.table.name === CurrentTableName &&
            node.id !== CurrentActiveNode.id,
    );
    return Node !== undefined;
});
const onClickCloneColumn = () => {
    if (currentActiveIndex.value === -1) return;
    const { name } = canvasStore.cloneColumnInActiveNode(
        currentActiveIndex.value,
    );
    const TableName = canvasStore.currentActiveNode.data.table.name;
    createHistory(`Cloned Column: '${name}' in '${TableName} table`);
};
const onClickDeleteColumn = () => {
    if (currentActiveIndex.value === -1) return;
    const { name } = canvasStore.removeColumnInActiveNode(
        currentActiveIndex.value,
    );
    deleteRelationByColumn(name);
    const TableName = canvasStore.currentActiveNode.data.table.name;
    createHistory(`Removed Column: '${name}' in '${TableName}' table`);
    currentActiveIndex.value = -1;
};
const onInputAddToHistory = useDebounceFn(() => {
    const TableName = canvasStore.currentActiveNode.data.table.name;
    createHistory(`Changed Table Name: '${TableName}'`);
}, 500);
const onClickToggleActiveState = (e: MouseEvent, ind: number) => {
    (e.target as HTMLButtonElement).blur();
    if (currentActiveIndex.value === ind) {
        currentActiveIndex.value = -1;
        return;
    }
    currentActiveIndex.value = ind;
};
const onSortEnd = ({ newIndex, oldIndex }) => {
    const Tables = canvasStore.currentActiveNode.data.table.columns;
    const DraggedColumn = Tables[newIndex].name;
    const ReplacedColumn = Tables[oldIndex].name;
    if (currentActiveIndex.value !== -1) {
        currentActiveIndex.value = newIndex;
    }

    sortPrimaryKey();
    createHistory(`Swapped Columns: ${DraggedColumn} and ${ReplacedColumn}`);
};
</script>

<template>
    <div>
        <div class="mb-4">
            <VAlert v-if="isTableNameUnique" type="danger"
                >This table name already exist. You might encounter a problem
                when trying to export them as script.
            </VAlert>
            <VPanelTextInput
                id="columnTextInput"
                v-model="canvasStore.currentActiveNode.data.table.name"
                placeholder="Place table's name here"
                :no-white-space="true"
                @input="onInputAddToHistory"
            >
                <template #label> Table's Name:</template>
            </VPanelTextInput>
        </div>

        <VueDraggable v-model="getColumns" @end="onSortEnd">
            <VPanelColumnButton
                v-for="(element, index) in getColumns"
                :key="`${element.name}`"
                class="mb-2 last-of-type:mb-0"
                :is-active="currentActiveIndex === index"
                @click="onClickToggleActiveState($event, index)"
                @dblclick="canvasStore.currentNodeActiveColumnIndex = index"
            >
                <template #column>
                    {{ element.name }}
                </template>
                <template #type>{{ element.type }}</template>
                <template #keyConstraint>{{ element.keyConstraint }}</template>
            </VPanelColumnButton>
        </VueDraggable>

        <div class="mt-2.5">
            <VPanelButtonIcon class="mr-1" @click="emits('addColumn', $event)">
                <AddIcon />
                <template #tooltip>
                    <span class="m-1.5 block text-[.6rem]"> Add Column </span>
                </template>
            </VPanelButtonIcon>
            <VPanelButtonIcon
                class="mr-1"
                :disabled="!canCloneColumn"
                @click="onClickCloneColumn"
            >
                <CopyIcon />
                <template #tooltip>
                    <span class="m-1.5 block text-[.6rem]"> Copy Column </span>
                </template>
            </VPanelButtonIcon>
            <VPanelButtonIcon
                color-scheme="danger"
                :disabled="currentActiveIndex === -1"
                @click="onClickDeleteColumn"
            >
                <TrashIcon />
                <template #tooltip>
                    <span class="m-1.5 block text-[.6rem]">
                        Delete Column
                    </span>
                </template>
            </VPanelButtonIcon>
        </div>
    </div>
</template>
