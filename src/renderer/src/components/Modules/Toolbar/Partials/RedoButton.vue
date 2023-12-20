<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import RedoIcon from '@components/Shared/Icons/RedoIcon.vue';
import { useHistoryStore } from '@stores/HistoryStore';

const historyStore = useHistoryStore();
</script>

<template>
    <BaseToolbarButtonIcon :disabled="!historyStore.canRedo">
        <RedoIcon />
        <template #tooltip>Redo</template>
    </BaseToolbarButtonIcon>
</template>
