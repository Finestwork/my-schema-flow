<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import UndoIcon from '@components/Shared/Icons/UndoIcon.vue';
import { useHistoryStore } from '@stores/HistoryStore';

const historyStore = useHistoryStore();
const emits = defineEmits<{
    (e: 'undo'): void;
}>();
const onClickUndo = () => {
    historyStore.undo();
    emits('undo');
};
</script>

<template>
    <BaseToolbarButtonIcon
        :disabled="!historyStore.canUndo"
        @click="onClickUndo"
    >
        <UndoIcon />
        <template #tooltip>Undo</template>
    </BaseToolbarButtonIcon>
</template>
