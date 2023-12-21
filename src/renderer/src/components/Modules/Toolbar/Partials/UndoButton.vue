<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import UndoIcon from '@components/Shared/Icons/UndoIcon.vue';
import { useHistoryStore } from '@stores/History';

const historyStore = useHistoryStore();
</script>

<template>
    <VToolbarButtonIcon :disabled="!historyStore.canUndo">
        <UndoIcon />
        <template #tooltip>Undo</template>
    </VToolbarButtonIcon>
</template>
