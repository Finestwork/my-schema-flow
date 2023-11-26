<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableName from '@components/TableInfoSettingsTableName.vue';
import { useTableStore } from '@stores/TableStore';

const TableStore = useTableStore();
</script>

<template>
    <TableInfoSectionWrapper :show-forms="TableStore.hasActiveNode">
        <TableInfoSettingsTableName />
    </TableInfoSectionWrapper>
</template>
