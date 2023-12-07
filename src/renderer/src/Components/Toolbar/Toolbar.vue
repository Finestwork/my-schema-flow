<script setup lang="ts">
import VTableIcon from '@components/Shared/Icons/VTableIcon.vue';
import VAutoLayoutIcon from '@components/Shared/Icons/VAutoLayoutIcon.vue';
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();

const onClickCreateTable = () => {
    tableStore.isCreatingTable = true;
};
const onClickRunAutoLayout = () => {
    settingsStore.runAutoLayout = true;
};
</script>
<template>
    <div class="px-2 py-3 dark:bg-dark-850">
        <BaseButtonIcon class="mr-2" @click="onClickCreateTable">
            <VTableIcon />
            <template #tooltip>Create Table</template>
        </BaseButtonIcon>
        <BaseButtonIcon @click="onClickRunAutoLayout">
            <VAutoLayoutIcon />
            <template #tooltip>Auto Layout</template>
        </BaseButtonIcon>
    </div>
</template>
