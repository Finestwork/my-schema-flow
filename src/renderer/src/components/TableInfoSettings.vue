<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableName from '@components/TableInfoSettingsTableName.vue';
import TableInfoSettingsTableColumns from '@components/TableInfoSettingsTableColumns.vue';
import TableInfoSettingsControls from '@components/TableInfoSettingsControls.vue';
import { useTableStore } from '@stores/TableStore';

const TableStore = useTableStore();
</script>

<template>
    <TableInfoSectionWrapper :show-forms="TableStore.hasActiveNode">
        <TableInfoSettingsTableName />
        <TableInfoSettingsTableColumns />
        <TableInfoSettingsControls />
    </TableInfoSectionWrapper>
</template>
