<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import RedoIcon from '@components/Shared/Icons/RedoIcon.vue';
import { useHistoryStore } from '@stores/History';
import { useHistory } from '@composables/Miscellaneous/useHistory';

const historyStore = useHistoryStore();
const { redoHistory } = useHistory();
</script>

<template>
    <VToolbarButtonIcon :disabled="!historyStore.canRedo" @click="redoHistory">
        <RedoIcon />
        <template #tooltip>Redo</template>
    </VToolbarButtonIcon>
</template>
