<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import UndoIcon from '@components/Shared/Icons/UndoIcon.vue';
import { useHistoryStore } from '@stores/History';
import { useHistoryActions } from '@composables/History/useHistoryActions';

const historyStore = useHistoryStore();
const { undoHistory } = useHistoryActions();
</script>

<template>
    <VToolbarButtonIcon :disabled="!historyStore.canUndo" @click="undoHistory">
        <UndoIcon />
        <template #tooltip>Undo</template>
    </VToolbarButtonIcon>
</template>
