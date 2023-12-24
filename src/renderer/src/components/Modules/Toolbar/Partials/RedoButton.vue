<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import RedoIcon from '@components/Shared/Icons/RedoIcon.vue';
import { useHistoryStore } from '@stores/History';
import { useHistoryActions } from '@composables/History/useHistoryActions';

const historyStore = useHistoryStore();
const { redoHistory } = useHistoryActions();
</script>

<template>
    <VToolbarButtonIcon :disabled="!historyStore.canRedo" @click="redoHistory">
        <RedoIcon />
        <template #tooltip>Redo</template>
    </VToolbarButtonIcon>
</template>
