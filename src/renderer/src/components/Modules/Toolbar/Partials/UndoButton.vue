<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import UndoIcon from '@components/Shared/Icons/UndoIcon.vue';
import { useHistoryStore } from '@stores/History';
import { useHistory } from '@composables/Miscellaneous/useHistory';

const historyStore = useHistoryStore();
const { undoHistory } = useHistory();
</script>

<template>
    <VToolbarButtonIcon :disabled="!historyStore.canUndo" @click="undoHistory">
        <UndoIcon />
        <template #tooltip>Undo</template>
    </VToolbarButtonIcon>
</template>
