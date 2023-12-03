<script setup lang="ts">
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import TableInfoSectionWrapper from '@components/TableInfoSectionWrapper.vue';
import TableInfoSettingsTableColumns from '@components/TableInfoSettingsTableColumns.vue';
import TableInfoSettingsControls from '@components/TableInfoSettingsControls.vue';
import TableInfoSettingsColumnForm from '@components/TableInfoSettingsColumnForm.vue';
import TableInfoSettingsEditColumnForm from '@components/TableInfoSettingsEditColumnForm.vue';
import TableInfoNoTableSelected from '@components/TableInfoNoTableSelected.vue';
import { useTableStore } from '@stores/TableStore';
import { useColumnActions } from '@composables/useColumnActions';
import { ref, watch } from 'vue';
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
                <TableInfoTextInput
                    id="tableSettingsTableName"
                    v-model="tableStore.currentActiveNode.data.table.name"
                    placeholder="Place table name here"
                >
                    <template #label>Table Name:</template>
                </TableInfoTextInput>
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
        <TableInfoNoTableSelected v-else />
    </TableInfoSectionWrapper>
</template>
