<script setup lang="ts">
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableName from '@components/TableInfoSettingsTableName.vue';
import TableInfoSettingsTableColumns from '@components/TableInfoSettingsTableColumns.vue';
import TableInfoSettingsControls from '@components/TableInfoSettingsControls.vue';
import TableInfoSettingsColumnForm from '@components/TableInfoSettingsColumnForm.vue';
import TableInfoSettingsEditColumnForm from '@components/TableInfoSettingsEditColumnForm.vue';
import { useTableStore } from '@stores/TableStore';
import { useColumnActions } from '@composables/useColumnActions';
import { nextTick, ref, watch } from 'vue';
import { useSettingsStore } from '@stores/SettingsStore';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableSettingsPanel);
const displayColumnForm = ref(false);
const displayEditColumnForm = ref(false);
const { activeColumnIndex, deleteColumn, cloneColumn, canCloneColumn, canDeleteColumn } =
    useColumnActions();
const onClickEditColumn = (index: number) => {
    displayEditColumnForm.value = true;
    activeColumnIndex.value = index;
};
watch(
    () => tableStore.hasActiveNode,
    (hasActiveNode) => {
        if (!hasActiveNode) {
            activeColumnIndex.value = -1;
            displayColumnForm.value = false;
            displayEditColumnForm.value = false;
        }
    },
);
</script>

<template>
    <TableInfoSectionWrapper v-model:show-form="showForm">
        <template #label>Table Settings</template>
        <template v-if="tableStore.hasActiveNode">
            <template v-if="!displayColumnForm && !displayEditColumnForm">
                <TableInfoSettingsTableName />
                <TableInfoSettingsTableColumns
                    v-model:current-index="activeColumnIndex"
                    @edit-column="onClickEditColumn"
                />
                <TableInfoSettingsControls
                    :can-clone="canCloneColumn"
                    :can-delete="canDeleteColumn"
                    :column-active-index="activeColumnIndex"
                    @add-column="displayColumnForm = true"
                    @copy-column="cloneColumn"
                    @delete-column="deleteColumn"
                />
            </template>
            <TableInfoSettingsColumnForm
                v-if="displayColumnForm && !displayEditColumnForm"
                @go-back="displayColumnForm = false"
            />
            <TableInfoSettingsEditColumnForm
                v-if="!displayColumnForm && displayEditColumnForm"
                :current-active-index="activeColumnIndex"
                @go-back="displayEditColumnForm = false"
            />
        </template>
        <p class="my-2 text-center text-xs font-semibold italic dark:text-slate-500" v-else>
            No table selected
        </p>
    </TableInfoSectionWrapper>
</template>
