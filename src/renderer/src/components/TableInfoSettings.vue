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
            <TableInfoSettingsTableColumns :current-index="columnActiveIndex" />
            <TableInfoSettingsControls @add-column="displayColumnForm = true" />
        </template>
        <TableInfoSettingsColumnForm v-else @go-back="displayColumnForm = false" />
    </TableInfoSectionWrapper>
</template>
