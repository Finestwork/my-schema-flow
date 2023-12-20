<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import UndoIcon from '@components/Shared/Icons/UndoIcon.vue';
import { useHistoryStore } from '@stores/HistoryStore';

const emits = defineEmits<{
    (e: 'undo'): void;
}>();
const historyStore = useHistoryStore();
const onClickUndoHistory = () => {
    historyStore.undo();
    emits('undo');
};
</script>

<template>
    <BaseToolbarButtonIcon
        :disabled="!historyStore.canUndo"
        @click="onClickUndoHistory"
    >
        <UndoIcon />
        <template #tooltip>Undo</template>
    </BaseToolbarButtonIcon>
</template>
