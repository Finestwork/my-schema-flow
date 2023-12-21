<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import RedoIcon from '@components/Shared/Icons/RedoIcon.vue';
import { useHistoryStore } from '@stores/History';

const historyStore = useHistoryStore();
</script>

<template>
    <VToolbarButtonIcon :disabled="!historyStore.canRedo">
        <RedoIcon />
        <template #tooltip>Redo</template>
    </VToolbarButtonIcon>
</template>
