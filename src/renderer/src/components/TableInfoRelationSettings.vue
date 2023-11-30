<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoRelationList from '@components/TableInfoRelationList.vue';
import TableInfoNoTableSelected from '@components/TableInfoNoTableSelected.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useTableStore } from '@stores/TableStore';
import { ref } from 'vue';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableRelationSettingsPanel);
</script>

<template>
    <TableInfoSectionWrapper :show-form="showForm">
        <template #label>Table Relations</template>
        <div v-if="tableStore.hasActiveNode">
            <TableInfoRelationList />
        </div>
        <TableInfoNoTableSelected v-else />
    </TableInfoSectionWrapper>
</template>
