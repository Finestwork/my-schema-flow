<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableName from '@components/TableInfoSettingsTableName.vue';
import TableInfoSettingsTableColumns from '@components/TableInfoSettingsTableColumns.vue';
import TableInfoSettingsControls from '@components/TableInfoSettingsControls.vue';
import TableInfoSettingsColumnForm from '@components/TableInfoSettingsColumnForm.vue';
import { useTableStore } from '@stores/TableStore';
import { copyColumn, deleteColumn } from '@composables/useColumnActions';
import { computed, ref, watch } from 'vue';

const TableStore = useTableStore();
const displayColumnForm = ref(false);
const showForm = ref(TableStore.hasActiveNode);
const columnActiveIndex = ref(-1);
const onClickCopyColumn = (e: MouseEvent) => {
    if (columnActiveIndex.value === -1) return;
    const Target = <HTMLButtonElement>e.currentTarget;
    copyColumn(columnActiveIndex.value);
    columnActiveIndex.value = -1;
    Target.blur();
};
const onClickDeleteColumn = () => {
    deleteColumn(columnActiveIndex.value);
    columnActiveIndex.value = -1;
};
const canCloneColumn = computed(() => {
    if (columnActiveIndex.value < 0) return false;
    const Columns = TableStore.currentActiveNode.data.table.columns;
    const CurrentSelectedColumn = Columns[columnActiveIndex.value];
    if (CurrentSelectedColumn.length === 0) return false;
    return CurrentSelectedColumn.keyConstraint !== 'PK';
});

watch(
    () => TableStore.hasActiveNode,
    (hasActiveNode) => {
        if (!hasActiveNode) {
            displayColumnForm.value = false;
        }
    },
);
watch(
    () => TableStore.hasActiveNode,
    (hasActiveNode) => {
        showForm.value = hasActiveNode;
    },
);
</script>

<template>
    <TableInfoSectionWrapper v-model:show-form="showForm">
        <template v-if="!displayColumnForm">
            <TableInfoSettingsTableName />
            <TableInfoSettingsTableColumns v-model:current-index="columnActiveIndex" />
            <TableInfoSettingsControls
                :can-clone="canCloneColumn"
                :column-active-index="columnActiveIndex"
                @add-column="displayColumnForm = true"
                @copy-column="onClickCopyColumn"
                @delete-column="onClickDeleteColumn"
            />
        </template>
        <TableInfoSettingsColumnForm v-else @go-back="displayColumnForm = false" />
    </TableInfoSectionWrapper>
</template>
