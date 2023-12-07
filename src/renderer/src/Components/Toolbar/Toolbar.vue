<script setup lang="ts">
import VTableIcon from '@components/Shared/Icons/VTableIcon.vue';
import VAutoLayoutIcon from '@components/Shared/Icons/VAutoLayoutIcon.vue';
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { nodeAutolayout } from '@utilities/NodeHelper';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();

const onClickCreateTable = () => {
    tableStore.isCreatingTable = true;
};
const onClickRunAutoLayout = () => {
    settingsStore.runAutoLayout = true;
};
const onClickLayoutOrientation = (orientation: 'TB' | 'LR' = 'TB') => {
    const { nodes, edges } = nodeAutolayout(tableStore.elements, tableStore.edges, orientation);
    tableStore.elements = nodes;
    tableStore.edges = edges;
    tableStore.edges.forEach(calculateEdgePosition);
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
        <button type="button" @click="onClickLayoutOrientation('TB')">Top to bottom</button>
        <button type="button" @click="onClickLayoutOrientation('LR')">Left to right</button>
    </div>
</template>
