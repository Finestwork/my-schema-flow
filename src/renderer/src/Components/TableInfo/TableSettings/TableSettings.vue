<script setup lang="ts">
import NoTableSelected from '@components/TableInfo/Shared/NoTableSelected.vue';
import VPanelSectionWrapper from '@components/Shared/Layouts/VPanelSectionWrapper.vue';
import AddColumnForm from '@components/TableInfo/TableSettings/Partials/AddColumnForm.vue';
import EditColumnForm from '@components/TableInfo/TableSettings/Partials/EditColumnForm.vue';
import FormControls from '@components/TableInfo/TableSettings/Partials/FormControls.vue';
import TableButtonList from '@components/TableInfo/TableSettings/Partials/TableButtonList.vue';
import TableInfoTextInput from '@components/TableInfo/Shared/TextInput.vue';
import { useColumnActions } from '@composables/useColumnActions';
import { useSettingsStore } from '@stores/SettingsStore';
import { useTableStore } from '@stores/TableStore';
import { ref, watch } from 'vue';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showForm = ref(!settingsStore.hideTableSettingsPanel);
const displayColumnForm = ref(false);
const displayEditColumnForm = ref(false);
const {
    activeColumnIndex,
    deleteColumn,
    cloneColumn,
    canCloneColumn,
    canDeleteColumn,
} = useColumnActions();
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
    <VPanelSectionWrapper v-model:show-form="showForm">
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
                <TableButtonList
                    v-model:current-index="activeColumnIndex"
                    @edit-column="onClickEditColumn"
                />
                <FormControls
                    :can-clone="canCloneColumn"
                    :can-delete="canDeleteColumn"
                    :column-active-index="activeColumnIndex"
                    @add-column="displayColumnForm = true"
                    @copy-column="cloneColumn"
                    @delete-column="deleteColumn"
                />
            </template>
            <AddColumnForm
                v-if="displayColumnForm && !displayEditColumnForm"
                @go-back="displayColumnForm = false"
            />
            <EditColumnForm
                v-if="!displayColumnForm && displayEditColumnForm"
                :current-active-index="activeColumnIndex"
                @go-back="displayEditColumnForm = false"
            />
        </template>
        <NoTableSelected v-else />
    </VPanelSectionWrapper>
</template>
