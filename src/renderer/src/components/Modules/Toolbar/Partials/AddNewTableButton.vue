<script setup lang="ts">
import TableIcon from '@components/Shared/Icons/TableIcon.vue';
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import { useCanvasStore } from '@stores/CanvasStore';

const canvasStore = useCanvasStore();
</script>
<template>
    <BaseToolbarButtonIcon
        @click="canvasStore.isCreatingTable = !canvasStore.isCreatingTable"
        :is-active="canvasStore.isCreatingTable"
    >
        <TableIcon />
        <template #tooltip>Add New Table</template>
    </BaseToolbarButtonIcon>
</template>
