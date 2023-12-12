<script setup lang="ts">
import CanvasControls from '@components/Canvas/Partials/Controls.vue';
import CustomNode from '@components/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Canvas/Partials/CustomNodePlaceholder.vue';
import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';
import { useHistoryStore } from '@stores/HistoryStore';
import { useAutoLayout } from '@composables/useAutoLayout';
import { useNodeCanvasEvents } from '@composables/useNodeCanvasEvents';
import { useWatchHistory } from '@composables/useWatchHistory';
import { useTablePlaceholder } from '@composables/useTablePlaceholder';
import { useSortTableColumns } from '@composables/useSortTableColumns';
import { useHistory } from '@composables/useHistory';
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
const { toObject, addNodes, onMove } = useVueFlow();
const { placeholderPosition, resetPlaceholderPosition, movePlaceholder } =
    useTablePlaceholder(tablePlaceholder);
const { sortAllColumnsInTables } = useSortTableColumns();
const { runAutoLayout } = useAutoLayout();
const { addHistory } = useHistory({
    onSave: {
        shouldIncrement: false,
    },
});

const onPaneMouseEnter = () => {
    isMouseEntered.value = true;
};
const onPaneMouseLeave = () => {
    isMouseEntered.value = false;
};
const onPaneClick = async () => {
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
        addNodes([NewNode]);
        await nextTick();
        isCreatingTable.value = false;
        resetPlaceholderPosition();
    }
};
const onPaneReady = async () => {
    sortAllColumnsInTables();
    runAutoLayout();
    await nextTick();
    addHistory();
};
const onPaneMouseMove = (event: MouseEvent) => {
    if (!isCreatingTable.value) return;
    movePlaceholder(event.clientX, event.clientY);
};
const onViewportChangeEnd = () => {
    const CurrentInstance = toObject();
    settingsStore.zoomLevel = +CurrentInstance.viewport.zoom.toFixed(1);
};

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
useWatchHistory(minimap);
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
            @pane-ready="onPaneReady"
            @pane-click="onPaneClick"
            @pane-mouse-enter="onPaneMouseEnter"
            @pane-mouse-leave="onPaneMouseLeave"
            @pane-mouse-move="onPaneMouseMove"
            @viewport-change-end="onViewportChangeEnd"
        >
            <Background class="h-full" pattern-color="#6381b8" />
            <MiniMap ref="minimap" pannable zoomable />
            <CanvasControls />
            <span
                class="absolute left-2 top-2 text-xs font-semibold text-slate-500"
                >{{ settingsStore.zoomLevel * 100 }}%</span
            >
            <template #node-custom="props">
                <CustomNode v-bind="props" :id="props.id" :data="props.data" />
            </template>
            <CustomNodePlaceholder
                ref="tablePlaceholder"
                class="absolute"
                :should-hide="isDragging || !isCreatingTable || !isMouseEntered"
            />
        </VueFlow>
    </div>
</template>
