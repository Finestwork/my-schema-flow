<script setup lang="ts">
import CanvasControls from '@components/Canvas/Partials/Controls.vue';
import CustomNode from '@components/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Canvas/Partials/CustomNodePlaceholder.vue';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useSortTableColumns } from '@composables/useSortTableColumns';
import { useAutoLayout } from '@composables/useAutoLayout';
import { useTableRelation } from '@composables/useTableRelation';
import { useTablePlaceholder } from '@composables/useTablePlaceholder';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { VueFlow } from '@vue-flow/core';
import { useDebounceFn } from '@vueuse/core';
import { ref, nextTick } from 'vue';

const newTableNode = ref();
const vueFlowComponent = ref();
const currentZoom = ref(0.5);
const isDragging = ref(false);
const isMouseEntered = ref(false);
let dragTimeoutId = 0;
const { tableStore, currentActiveEdges } = useTableRelation();
const { sortAllColumnsInTables } = useSortTableColumns();
const { placeholderPosition, resetPlaceholderPosition, movePlaceholder } =
    useTablePlaceholder(newTableNode);

const resetActiveState = () => {
    if (Object.keys(tableStore.currentActiveNode).length !== 0) {
        tableStore.currentActiveNode.data.state = {
            isActive: false,
        };
    }
    currentActiveEdges.value.forEach((edge) => {
        edge.style = {};
        edge.animated = false;
    });
};

const onPaneMouseEnter = () => {
    isMouseEntered.value = true;
};
const onPaneMouseLeave = () => {
    isMouseEntered.value = false;
};
const onPaneMouseMove = (event: MouseEvent) => {
    if (!tableStore.isCreatingTable) return;
    movePlaceholder(event.clientX, event.clientY);
};
const onNodeClick = (event) => {
    resetActiveState();
    tableStore.currentActiveNode = { ...event.node };
    tableStore.currentActiveNode.data.state.isActive = true;
    currentActiveEdges.value.forEach((edge) => {
        edge.style = {
            stroke: '#3b82f6',
        };
        edge.animated = true;
    });
};
const onNodeDrag = useDebounceFn((event) => {
    resetActiveState();
    // If the current node is not the same with previously dragged node
    if (tableStore.currentActiveNode.id !== event.node.id) {
        tableStore.currentActiveEdgeIndex = -1;
    }
    tableStore.currentActiveNode = { ...event.node };
    tableStore.currentActiveNode.data.state.isActive = true;
    currentActiveEdges.value.forEach((edge) => {
        edge.style = {
            stroke: '#3b82f6',
        };
        edge.animated = true;
    });
    currentActiveEdges.value.forEach(calculateEdgePosition);
}, 150);
const onPaneClick = async () => {
    resetActiveState();
    tableStore.currentActiveNode = {};
    tableStore.currentActiveEdges = [];
    if (tableStore.currentActiveEdgeIndex !== -1) {
        tableStore.currentActiveEdgeIndex = -1;
    }

    if (tableStore.isCreatingTable) {
        tableStore.createNewElement(placeholderPosition.value.x, placeholderPosition.value.y);
        await nextTick();
        tableStore.isCreatingTable = false;
        resetPlaceholderPosition();
    }
};
const onMove = (event) => {
    resetActiveState();
    tableStore.currentActiveNode = {};
    tableStore.currentActiveEdges = [];
    if (tableStore.currentActiveEdgeIndex !== -1) {
        tableStore.currentActiveEdgeIndex = -1;
    }
    isDragging.value = true;
    clearTimeout(dragTimeoutId);
    dragTimeoutId = window.setTimeout(() => {
        isDragging.value = false;
        if (!tableStore.isCreatingTable) return;
        const { clientX, clientY } = event.event.sourceEvent;
        movePlaceholder(clientX, clientY);
    }, 150);
};
const onPaneReady = () => {
    sortAllColumnsInTables();
    useAutoLayout();
    tableStore.edges.forEach(calculateEdgePosition);
};
</script>

<template>
    <div class="relative">
        <VueFlow
            ref="vueFlowComponent"
            v-model:nodes="tableStore.elements"
            v-model:edges="tableStore.edges"
            :class="{
                'add-crosshair': tableStore.isCreatingTable && isMouseEntered && !isDragging,
            }"
            :default-edge-options="{ type: 'smoothstep' }"
            :default-viewport="{ zoom: currentZoom }"
            :min-zoom="0.1"
            :max-zoom="1"
            :delete-key-code="null"
            @node-click="onNodeClick"
            @node-drag="onNodeDrag"
            @move="onMove"
            @pane-click="onPaneClick"
            @pane-ready="onPaneReady"
            @pane-mouse-enter="onPaneMouseEnter"
            @pane-mouse-move="onPaneMouseMove"
            @pane-mouse-leave="onPaneMouseLeave"
        >
            <Background class="h-full" pattern-color="#6381b8" />
            <MiniMap pannable zoomable />
            <CanvasControls v-model:current-zoom="currentZoom" />
            <span class="absolute left-2 top-2 text-xs font-semibold text-slate-500"
                >{{ currentZoom * 100 }}%</span
            >
            <template #node-custom="props">
                <CustomNode v-bind="props" :data="props.data" />
            </template>
            <CustomNodePlaceholder
                ref="newTableNode"
                class="absolute"
                :should-hide="isDragging || !tableStore.isCreatingTable || !isMouseEntered"
            />
        </VueFlow>
    </div>
</template>
