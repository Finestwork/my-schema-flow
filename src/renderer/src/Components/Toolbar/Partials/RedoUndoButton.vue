<script setup lang="ts">
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
import VRedoIcon from '@components/Shared/Icons/VRedoIcon.vue';
import VUndoIcon from '@components/Shared/Icons/VUndoIcon.vue';
import { useHistoryStore } from '@stores/HistoryStore';

const historyStore = useHistoryStore();

const onClickRedo = () => {
    historyStore.redo();
};
const onClickUndo = () => {
    historyStore.undo();
};
const onClickCheckHistory = () => {
    console.log(historyStore.items, historyStore.currentIndex);
};
</script>
<template>
    <div class="flex items-center">
        <button
            class="mr-2 text-white"
            type="button"
            @click="onClickCheckHistory"
        >
            check history
        </button>
        <BaseButtonIcon
            class="mr-2"
            :disabled="!historyStore.canUndo"
            @click="onClickUndo"
        >
            <VUndoIcon />
            <template #tooltip>Undo</template>
        </BaseButtonIcon>
        <BaseButtonIcon :disabled="!historyStore.canRedo" @click="onClickRedo">
            <VRedoIcon />
            <template #tooltip>Redo</template>
        </BaseButtonIcon>
    </div>
</template>
