<script setup lang="ts">
import CanvasControls from '@components/Canvas/Partials/Controls.vue';
import CustomNode from '@components/Canvas/Partials/CustomNode.vue';
import CustomNodePlaceholder from '@components/Canvas/Partials/CustomNodePlaceholder.vue';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { sortConstraintKeys } from '@utilities/TableColumnHelper';
import { nodeAutolayout } from '@utilities/NodeHelper';
import { useTableRelation } from '@composables/useTableRelation';
import { useSettingsStore } from '@stores/SettingsStore';
import { Background } from '@vue-flow/background';
import { useVueFlow, VueFlow } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { ref, nextTick, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core/index';

const settingsStore = useSettingsStore();
const newTableNode = ref();
const currentZoom = ref(0.5);
const isDragging = ref(false);
const isMouseEntered = ref(false);
const placeholderPosition = ref({
    x: -1,
    y: -1,
});
let dragTimeoutId = 0;
const { tableStore, currentActiveEdges } = useTableRelation();
const { vueFlowRef, project } = useVueFlow();

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
const movePlaceholder = (event: MouseEvent) => {
    if (!vueFlowRef.value) return;
    const { left, top } = vueFlowRef.value.getBoundingClientRect();
    const { clientX, clientY } = event;
    const Component = <typeof CustomNodePlaceholder>newTableNode.value;
    placeholderPosition.value = project({
        x: clientX - left,
        y: clientY - top,
    });
    Object.assign(Component.$el.style, {
        left: `${clientX - left + 5}px`,
        top: `${clientY - top + 5}px`,
    });
};
const runAutoLayout = () => {
    const { nodes, edges } = nodeAutolayout(tableStore.elements, tableStore.edges);
    tableStore.elements = nodes;
    tableStore.edges = edges;
};

const onPaneMouseEnter = () => {
    isMouseEntered.value = true;
};
const onPaneMouseLeave = () => {
    isMouseEntered.value = false;
};
const onPaneMouseMove = (event: MouseEvent) => {
    if (!tableStore.isCreatingTable) return;
    movePlaceholder(event);
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
        placeholderPosition.value.x = -1;
        placeholderPosition.value.y = -1;
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
        movePlaceholder(event.event.sourceEvent);
    }, 150);
};
const onPaneReady = () => {
    tableStore.elements = tableStore.elements.map((element) => {
        const Columns = element.data.table.columns;
        element.data.table.columns = sortConstraintKeys(Columns);
        return element;
    });
    runAutoLayout();
    tableStore.edges.forEach(calculateEdgePosition);
};

watch(
    () => settingsStore.runAutoLayout,
    async (shouldRun) => {
        if (shouldRun) {
            runAutoLayout();
            await nextTick();
            settingsStore.runAutoLayout = false;
        }
    },
);
</script>

<template>
    <div class="relative">
        <VueFlow
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
            <Background pattern-color="#6381b8" />
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
