<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import AutoLayoutIcon from '@components/Shared/Icons/AutoLayoutIcon.vue';
import { useNodeAutoLayout } from '@composables/Nodes/useAutoLayout';
import { useHistoryActions } from '@composables/History/useHistoryActions';
import { useHistoryStore } from '@stores/History';
import { vueFlowKey } from '@symbols/VueFlow';
import { nextTick, inject } from 'vue';

const historyStore = useHistoryStore();
const vueFlow = inject(vueFlowKey);
const { autoLayout } = useNodeAutoLayout();
const { createHistory } = useHistoryActions();

const onClickRunAutoLayout = async () => {
    autoLayout();
    await nextTick();

    if (!vueFlow) return;
    const { payload } = historyStore.items[historyStore.currentIndex];
    const HasSomeChanges = vueFlow.getNodes.value.some((node) => {
        const Node = payload.nodes.find((n) => n.id === node.id);
        if (!Node) return false;
        return (
            Node.position.x !== node.position.x ||
            Node.position.y !== node.position.y
        );
    });

    if (HasSomeChanges) {
        createHistory('Run AutoLayout');
    }
};
</script>

<template>
    <VToolbarButtonIcon @click="onClickRunAutoLayout">
        <AutoLayoutIcon />
        <template #tooltip>Run AutoLayout</template>
    </VToolbarButtonIcon>
</template>
