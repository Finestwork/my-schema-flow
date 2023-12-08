<script setup lang="ts">
import VTableIcon from '@components/Shared/Icons/VTableIcon.vue';
import VAutoLayoutIcon from '@components/Shared/Icons/VAutoLayoutIcon.vue';
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
import ChangeLayoutButton from '@components/Toolbar/Partials/ChangeLayoutButton.vue';
import ExportButton from '@components/Toolbar/Partials/ExportButton.vue';
import { useTableStore } from '@stores/TableStore';
import { useAutoLayout } from '@composables/useAutoLayout';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';

const tableStore = useTableStore();

const onClickCreateTable = () => {
    tableStore.isCreatingTable = true;
};
const onClickRunAutoLayout = () => {
    useAutoLayout();
    tableStore.edges.forEach(calculateEdgePosition);
};
</script>
<template>
    <div class="flex px-2 py-3 dark:bg-dark-850">
        <BaseButtonIcon class="mr-2" @click="onClickCreateTable">
            <VTableIcon />
            <template #tooltip>Create Table</template>
        </BaseButtonIcon>
        <BaseButtonIcon class="mr-2" @click="onClickRunAutoLayout">
            <VAutoLayoutIcon />
            <template #tooltip>Auto Layout</template>
        </BaseButtonIcon>
        <ChangeLayoutButton class="mr-2" />
        <ExportButton />
    </div>
</template>
