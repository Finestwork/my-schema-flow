<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Wrappers/VPanelSectionWrapper.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useSettingsStore } from '@stores/Settings';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { vueFlowKey } from '@symbols/VueFlow';
import { computed, inject } from 'vue';

const vueFlow = inject(vueFlowKey);
const canvasStore = useCanvasStore();
const settingsStore = useSettingsStore();
const { activateState } = useNodeStateHandler();
const getTableList = computed(() => {
    if (!vueFlow) return [];
    return vueFlow.getNodes.value.map((node) => ({
        isActive: !canvasStore.hasActiveNode
            ? false
            : canvasStore.currentActiveNode.id === node.id,
        id: node.id,
        name: node.data.table.name,
    }));
});
const onClickHighlightTable = (id: string) => {
    if (!vueFlow) return;
    const Node = vueFlow.getNodes.value.find((node) => node.id === id);

    if (!Node) return;

    canvasStore.currentActiveNode = Node;
    activateState();

    vueFlow.fitView({
        maxZoom: settingsStore.zoomLevel,
        nodes: [id],
    });
};
</script>

<template>
    <VPanelSectionWrapper>
        <template #label>Tables</template>
        <template #content>
            <span
                class="mb-1 mt-2 block text-[.7rem] font-semibold text-slate-500 dark:text-dark-400"
                >Total: {{ getTableList.length }}</span
            >
            <button
                v-for="table in getTableList"
                :key="table.id"
                class="mb-0.5 w-full rounded px-1.5 py-2 text-left text-xs font-semibold text-dark-500 last-of-type:mb-0"
                type="button"
                :class="{
                    ' hover:bg-slate-300 dark:text-dark-50 dark:hover:bg-cyan-950/50 dark:hover:text-cyan-500':
                        !table.isActive,
                    'bg-slate-300 dark:bg-cyan-950/50 dark:text-cyan-500':
                        table.isActive,
                }"
                @click="onClickHighlightTable(table.id)"
            >
                {{ table.name }}
            </button>
        </template>
    </VPanelSectionWrapper>
</template>