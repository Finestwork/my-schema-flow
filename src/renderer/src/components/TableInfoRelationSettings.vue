<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoNoTableSelected from '@components/TableInfoNoTableSelected.vue';
import TableInfoBaseButton from '@components/TableInfoBaseButton.vue';
import TableInfoRelationCreate from '@components/TableInfoRelationCreate.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { useTableStore } from '@stores/TableStore';
import { ref, reactive } from 'vue';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableRelationSettingsPanel);
const states = reactive({
    showCreateForm: false,
});
</script>

<template>
    <TableInfoSectionWrapper :show-form="showForm">
        <template #label>Table Relations</template>
        <div v-if="tableStore.hasActiveNode">
            <TableInfoRelationCreate v-if="states.showCreateForm" />
            <TableInfoBaseButton v-else @click="states.showCreateForm = true">
                <template #icon>
                    <IconAdd />
                </template>
                <template #text>Add Relation</template>
            </TableInfoBaseButton>
        </div>
        <TableInfoNoTableSelected v-else />
    </TableInfoSectionWrapper>
</template>
