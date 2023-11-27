<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableName from '@components/TableInfoSettingsTableName.vue';
import TableInfoSettingsTableColumns from '@components/TableInfoSettingsTableColumns.vue';
import TableInfoSettingsControls from '@components/TableInfoSettingsControls.vue';
import TableInfoSettingsColumnForm from '@components/TableInfoSettingsColumnForm.vue';
import { useTableStore } from '@stores/TableStore';
import { ref } from 'vue';

const TableStore = useTableStore();
const displayColumnForm = ref(true);
</script>

<template>
    <TableInfoSectionWrapper :show-forms="TableStore.hasActiveNode">
        <template v-if="!displayColumnForm">
            <TableInfoSettingsTableName />
            <TableInfoSettingsTableColumns />
            <TableInfoSettingsControls @add-column="displayColumnForm = true" />
        </template>
        <TableInfoSettingsColumnForm v-else @go-back="displayColumnForm = false" />
    </TableInfoSectionWrapper>
</template>
