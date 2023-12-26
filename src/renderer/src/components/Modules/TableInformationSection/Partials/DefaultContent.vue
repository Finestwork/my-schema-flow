<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import VPanelButtonIcon from '@components/Base/ButtonIcons/VPanelButtonIcon.vue';
import VPanelColumnButton from '@components/Base/Buttons/VPanelColumnButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import CopyIcon from '@components/Shared/Icons/CopyIcon.vue';
import TrashIcon from '@components/Shared/Icons/TrashIcon.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useTableRelationActions } from '@composables/Table/useTableRelationActions';
import { useSortTableColumns } from '@composables/Table/useSortTableColumns';
import { useDebounceFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

export type TColumnList = {
    name: string;
    type: string;
    keyConstraint: 'PK' | 'FK' | string;
};
const emits = defineEmits<{
    (e: 'addColumn', value: Event): void;
    (e: 'editColumn', value: number): void;
}>();
const canvasStore = useCanvasStore();
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
const { deleteRelationByColumn } = useTableRelationActions();
const { createHistory } = useHistoryActions();
const { sortPrimaryKey } = useSortTableColumns();
const onClickCloneColumn = () => {
    const { name } = canvasStore.cloneColumnInActiveNode(
        currentActiveIndex.value,
    );
    const TableName = canvasStore.currentActiveNode.data.table.name;
    createHistory(`Cloned Column: '${name}' in '${TableName} table`);
};
const onClickDeleteColumn = () => {
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
});
const onClickToggleActiveState = (e: MouseEvent, ind: number) => {
    (e.target as HTMLButtonElement).blur();
    if (currentActiveIndex.value === ind) {
        currentActiveIndex.value = -1;
        return;
    }
    currentActiveIndex.value = ind;
};
</script>

<template>
    <div>
        <VPanelTextInput
            id="columnTextInput"
            v-model="canvasStore.currentActiveNode.data.table.name"
            class="mb-4"
            placeholder="Place table's name here"
            @input="onInputAddToHistory"
        >
            <template #label> Table's Name:</template>
        </VPanelTextInput>

        <VueDraggable v-model="getColumns" @end="sortPrimaryKey">
            <VPanelColumnButton
                v-for="(element, index) in getColumns"
                :key="`${element.name}`"
                class="mb-2 last-of-type:mb-0"
                :is-active="currentActiveIndex === index"
                @click="onClickToggleActiveState($event, index)"
                @dblclick="emits('editColumn', index)"
            >
                <template #column>
                    {{ element.name }}
                </template>
                <template #type>{{ element.type }}</template>
                <template #keyConstraint>{{ element.keyConstraint }} </template>
            </VPanelColumnButton>
        </VueDraggable>

        <div class="mt-2.5">
            <VPanelButtonIcon class="mr-1" @click="emits('addColumn', $event)">
                <AddIcon />
                <template #tooltip>Add Column</template>
            </VPanelButtonIcon>
            <VPanelButtonIcon
                class="mr-1"
                :disabled="!canCloneColumn"
                @click="onClickCloneColumn"
            >
                <CopyIcon />
                <template #tooltip>Copy Column</template>
            </VPanelButtonIcon>
            <VPanelButtonIcon
                color-scheme="danger"
                :disabled="currentActiveIndex === -1"
                @click="onClickDeleteColumn"
            >
                <TrashIcon />
                <template #tooltip>Delete Column</template>
            </VPanelButtonIcon>
        </div>
    </div>
</template>
