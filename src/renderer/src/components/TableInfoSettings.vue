<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableName from '@components/TableInfoSettingsTableName.vue';
import TableInfoSettingsTableColumns from '@components/TableInfoSettingsTableColumns.vue';
import TableInfoSettingsControls from '@components/TableInfoSettingsControls.vue';
import TableInfoSettingsColumnForm from '@components/TableInfoSettingsColumnForm.vue';
import { useTableStore } from '@stores/TableStore';
import { ref, watch } from 'vue';

const TableStore = useTableStore();
const displayColumnForm = ref(false);
const showForm = ref(TableStore.hasActiveNode);
const columnActiveIndex = ref(-1);
const onClickCopyColumn = (e: MouseEvent) => {
    const Target = <HTMLButtonElement>e.currentTarget;
    const Columns = TableStore.currentActiveNode.data.table.columns;
    const CurrentColumn = Columns[columnActiveIndex.value];
    Columns.push(Object.assign({}, CurrentColumn));
    columnActiveIndex.value = -1;
    console.log(e.currentTarget, e.target);
    Target.blur();
};

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
                @add-column="displayColumnForm = true"
                @copy-column="onClickCopyColumn"
            />
        </template>
        <TableInfoSettingsColumnForm v-else @go-back="displayColumnForm = false" />
    </TableInfoSectionWrapper>
</template>
