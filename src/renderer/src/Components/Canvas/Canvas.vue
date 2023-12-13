<script setup lang="ts">
import CanvasControls from '@components/Canvas/Partials/Controls.vue';
import CustomNode from '@components/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Canvas/Partials/CustomNodePlaceholder.vue';
import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';
import { useAutoLayout } from '@composables/useAutoLayout';
import { useNodeCanvasEvents } from '@composables/useNodeCanvasEvents';
import { useTablePlaceholder } from '@composables/useTablePlaceholder';
import { useSortTableColumns } from '@composables/useSortTableColumns';
import { useHistory } from '@composables/useHistory';
import { useCanvasViewport } from '@composables/useCanvasViewport';
import { useWatchHistoryValue } from '@composables/useWatchHistoryValue';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { useDebounceFn } from '@vueuse/core';
import { nextTick, ref } from 'vue';

const { isCreatingTable } = defineModels<{
    isCreatingTable: boolean;
}>();
const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const tablePlaceholder = ref();
const minimap = ref();
const isDragging = ref(false);
const isMouseEntered = ref(false);
const {
    addNodes,
    onMove,
    onPaneMouseEnter,
    onPaneMouseLeave,
    onPaneClick,
    onPaneReady,
    onPaneMouseMove,
} = useVueFlow();
const { placeholderPosition, resetPlaceholderPosition, movePlaceholder } =
    useTablePlaceholder(tablePlaceholder);
const { sortAllColumnsInTables } = useSortTableColumns();
const { runAutoLayout } = useAutoLayout();
const { addHistory } = useHistory();

onPaneMouseEnter(() => {
    isMouseEntered.value = true;
});
onPaneMouseLeave(() => {
    isMouseEntered.value = false;
});
onPaneClick(async () => {
    tableStore.currentActiveNode = Object.assign({}, {});
    tableStore.currentActiveEdges = [];
    if (tableStore.currentActiveEdgeIndex !== -1) {
        tableStore.currentActiveEdgeIndex = -1;
    }

    if (isCreatingTable.value) {
        const NewNode = tableStore.createNewElement(
            placeholderPosition.value.x,
            placeholderPosition.value.y,
        );
        const TableName = NewNode.data.table.name;
        addNodes([NewNode]);
        addHistory(`${TableName} table is added`);
        await nextTick();
        isCreatingTable.value = false;
        resetPlaceholderPosition();
    }
});
onPaneReady(async () => {
    sortAllColumnsInTables();
    runAutoLayout();
    await nextTick();
    addHistory('Initial load', { shouldIncrement: false });
});
onPaneMouseMove((event: MouseEvent) => {
    if (!isCreatingTable.value) return;
    movePlaceholder(event.clientX, event.clientY);
});

onMove(
    useDebounceFn((event) => {
        isDragging.value = false;
        if (!isCreatingTable.value) return;
        const { clientX, clientY } = event.event.sourceEvent;
        movePlaceholder(clientX, clientY);
    }, 150),
);
onMove(() => {
    isDragging.value = true;
});
useNodeCanvasEvents(minimap);
useCanvasViewport();
useWatchHistoryValue(minimap);
</script>

<template>
    <div class="relative">
        <VueFlow
            v-model:nodes="tableStore.elements"
            v-model:edges="tableStore.edges"
            :class="{
                'add-crosshair':
                    isCreatingTable && isMouseEntered && !isDragging,
            }"
            :default-edge-options="{
                type: 'smoothstep',
            }"
            :default-viewport="{
                zoom: settingsStore.zoomLevel,
            }"
            :min-zoom="0.1"
            :max-zoom="1"
            :delete-key-code="null"
        >
            <Background class="h-full" pattern-color="#6381b8" />
            <MiniMap ref="minimap" pannable zoomable />
            <CanvasControls />
            <span
                class="absolute left-2 top-2 text-xs font-semibold text-slate-500"
                >{{ settingsStore.zoomLevel * 100 }}%</span
            >
            <template #node-custom="props">
                <CustomNode
                    v-bind="props"
                    :id="props.id"
                    :data="props.data"
                    :is-creating-table="isCreatingTable"
                />
            </template>
            <CustomNodePlaceholder
                ref="tablePlaceholder"
                class="absolute"
                :should-hide="isDragging || !isCreatingTable || !isMouseEntered"
            />
        </VueFlow>
    </div>
</template>
