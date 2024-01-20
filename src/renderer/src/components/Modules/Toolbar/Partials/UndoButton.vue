<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import UndoIcon from '@components/Shared/Icons/UndoIcon.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';
import { useHistoryStore } from '@stores/History';
import { useHistoryActions } from '@composables/History/useHistoryActions';

const historyStore = useHistoryStore();
const { undoHistory } = useHistoryActions();
</script>

<template>
    <VToolbarButtonIcon :disabled="!historyStore.canUndo" @click="undoHistory">
        <UndoIcon />
        <template #tooltip>
            <VTooltipKeyboardText :windows="['Ctrl', 'Z']" :mac="['⌘', 'Z']">
                <template #label>Undo</template>
            </VTooltipKeyboardText>
        </template>
    </VToolbarButtonIcon>
</template>
