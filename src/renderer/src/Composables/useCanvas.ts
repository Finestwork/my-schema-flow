import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';
import { useTablePlaceholder } from '@composables/useTablePlaceholder';
import { useSortTableColumns } from '@composables/useSortTableColumns';
import { useAutoLayout } from '@composables/useAutoLayout';
import {
    calculateEdgePosition,
    getActiveEdges,
    extractNodeIdFromEdge,
} from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { computed, nextTick, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { MaybeRefOrGetter } from 'vue';
import { useMinimap } from '@composables/useMinimap';

export function useCanvas(tablePlaceholder: MaybeRefOrGetter, minimap: MaybeRefOrGetter) {
    const tableStore = useTableStore();
    const settingsStore = useSettingsStore();
    const isDragging = ref(false);
    const isMouseEntered = ref(false);
    const { placeholderPosition, resetPlaceholderPosition, movePlaceholder } =
        useTablePlaceholder(tablePlaceholder);
    const {
        nodeIds: minimapNodeIds,
        highlightNodes: highlightMiniMapNodes,
        unHighlightNodes: unHighlightNodesMinimapNodes,
    } = useMinimap(minimap);
    const { sortAllColumnsInTables } = useSortTableColumns();
    const { addNodes, toObject } = useVueFlow();
    let dragTimeoutId = 0;

    const getCanvasClass = computed(() => {
        return {
            'add-crosshair':
                tableStore.isCreatingTable && isMouseEntered.value && !isDragging.value,
        };
    });
    const shouldHidePlaceholder = computed(() => {
        return isDragging.value || !tableStore.isCreatingTable || !isMouseEntered.value;
    });

    const _highlightNodes = (event) => {
        tableStore.unHighlightNodes();

        tableStore.currentActiveNode = { ...event.node };
        tableStore.currentActiveEdges = getActiveEdges(
            tableStore.currentActiveNode,
            tableStore.edges,
        );

        const HighlightedNodes = tableStore.highlightNodes();
        minimapNodeIds.value = extractNodeIdFromEdge(HighlightedNodes.related);
        highlightMiniMapNodes();
    };
    const onNodeClick = (event) => {
        _highlightNodes(event);
    };
    const onNodeDrag = useDebounceFn((event) => {
        _highlightNodes(event);
        // If the current node is not the same with previously dragged node
        if (tableStore.currentActiveNode.id !== event.node.id) {
            tableStore.currentActiveEdgeIndex = -1;
        }
        tableStore.currentActiveEdges.forEach((edge) => {
            const { targetHandle, sourceHandle } = calculateEdgePosition(edge);
            edge.sourceHandle = sourceHandle;
            edge.targetHandle = targetHandle;
        });
    }, 150);
    const onPaneMouseMove = (event: MouseEvent) => {
        if (!tableStore.isCreatingTable) return;
        movePlaceholder(event.clientX, event.clientY);
    };
    const onPaneMouseEnter = () => {
        isMouseEntered.value = true;
    };
    const onPaneMouseLeave = () => {
        isMouseEntered.value = false;
    };
    const onPaneClick = async () => {
        tableStore.unHighlightNodes();
        unHighlightNodesMinimapNodes();
        tableStore.currentActiveNode = Object.assign({}, {});
        tableStore.currentActiveEdges = [];
        if (tableStore.currentActiveEdgeIndex !== -1) {
            tableStore.currentActiveEdgeIndex = -1;
        }

        if (tableStore.isCreatingTable) {
            const NewNode = tableStore.createNewElement(
                placeholderPosition.value.x,
                placeholderPosition.value.y,
            );
            addNodes([NewNode]);
            await nextTick();
            tableStore.isCreatingTable = false;
            resetPlaceholderPosition();
        }
    };
    const onPaneReady = () => {
        sortAllColumnsInTables();
        useAutoLayout();
        tableStore.edges.forEach((edge) => {
            const { targetHandle, sourceHandle } = calculateEdgePosition(edge);
            edge.sourceHandle = sourceHandle;
            edge.targetHandle = targetHandle;
        });
    };
    const onMove = (event) => {
        isDragging.value = true;
        clearTimeout(dragTimeoutId);
        dragTimeoutId = window.setTimeout(() => {
            isDragging.value = false;
            if (!tableStore.isCreatingTable) return;
            const { clientX, clientY } = event.event.sourceEvent;
            movePlaceholder(clientX, clientY);
        }, 150);
    };
    const onViewportChangeEnd = () => {
        const CurrentInstance = toObject();
        settingsStore.zoomLevel = +CurrentInstance.viewport.zoom.toFixed(1);
    };

    return {
        tableStore,
        settingsStore,
        isMouseEntered,
        isDragging,
        getCanvasClass,
        shouldHidePlaceholder,
        onNodeClick,
        onNodeDrag,
        onPaneMouseMove,
        onPaneMouseEnter,
        onPaneMouseLeave,
        onPaneClick,
        onPaneReady,
        onMove,
        onViewportChangeEnd,
    };
}
