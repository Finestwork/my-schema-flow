<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableName from '@components/TableInfoSettingsTableName.vue';
import TableInfoSettingsTableColumns from '@components/TableInfoSettingsTableColumns.vue';
import TableInfoSettingsControls from '@components/TableInfoSettingsControls.vue';
import TableInfoSettingsColumnForm from '@components/TableInfoSettingsColumnForm.vue';
import { useTableStore } from '@stores/TableStore';
import { useColumnActions } from '@composables/useColumnActions';
import { ref, watch } from 'vue';
import { useSettingsStore } from '@stores/SettingsStore';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableSettingsPanel);
const displayColumnForm = ref(false);
const { activeColumnIndex, deleteColumn, cloneColumn, canCloneColumn } = useColumnActions();

watch(
    () => tableStore.hasActiveNode,
    (hasActiveNode) => {
        if (!hasActiveNode) {
            activeColumnIndex.value = -1;
            displayColumnForm.value = false;
        }
    },
);
</script>

<template>
    <TableInfoSectionWrapper v-model:show-form="showForm">
        <template v-if="tableStore.hasActiveNode">
            <template v-if="!displayColumnForm">
                <TableInfoSettingsTableName />
                <TableInfoSettingsTableColumns v-model:current-index="activeColumnIndex" />
                <TableInfoSettingsControls
                    :can-clone="canCloneColumn"
                    :column-active-index="activeColumnIndex"
                    @add-column="displayColumnForm = true"
                    @copy-column="cloneColumn"
                    @delete-column="deleteColumn"
                />
            </template>
            <TableInfoSettingsColumnForm v-else @go-back="displayColumnForm = false" />
        </template>
        <p class="my-2 text-center text-xs font-semibold italic dark:text-slate-500" v-else>
            No table selected
        </p>
    </TableInfoSectionWrapper>
</template>
