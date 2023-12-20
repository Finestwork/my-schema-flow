<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import RedoIcon from '@components/Shared/Icons/RedoIcon.vue';
import { useHistoryStore } from '@stores/HistoryStore';

const emits = defineEmits<{
    (e: 'redo'): void;
}>();
const historyStore = useHistoryStore();
const onClickRedoHistory = () => {
    historyStore.redo();
    emits('redo');
};
</script>

<template>
    <BaseToolbarButtonIcon
        :disabled="!historyStore.canRedo"
        @click="onClickRedoHistory"
    >
        <RedoIcon />
        <template #tooltip>Redo</template>
    </BaseToolbarButtonIcon>
</template>
