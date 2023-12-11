import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';
import { useHistoryStore } from '@stores/HistoryStore';
import { useTablePlaceholder } from '@composables/useTablePlaceholder';
import { useSortTableColumns } from '@composables/useSortTableColumns';
import { useAutoLayout } from '@composables/useAutoLayout';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { computed, nextTick, ref } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

export function useCanvas(tablePlaceholder: MaybeRefOrGetter, minimap: MaybeRefOrGetter) {
    const tableStore = useTableStore();
    const settingsStore = useSettingsStore();
    const historyStore = useHistoryStore();
    const isDragging = ref(false);
    const isMouseEntered = ref(false);
    const { placeholderPosition, resetPlaceholderPosition, movePlaceholder } =
        useTablePlaceholder(tablePlaceholder);
    const { sortAllColumnsInTables } = useSortTableColumns();
    const { getNodes, getEdges, addNodes, toObject } = useVueFlow();
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
    const onPaneReady = async () => {
        sortAllColumnsInTables();
        useAutoLayout();
        tableStore.edges.forEach((edge) => {
            const { targetHandle, sourceHandle } = calculateEdgePosition(edge);
            edge.sourceHandle = sourceHandle;
            edge.targetHandle = targetHandle;
        });
        await nextTick();
        const ItemObject = {
            description: 'Initial Load',
            payload: {
                nodes: getNodes.value,
                edges: getEdges.value,
            },
        };
        historyStore.addItem(ItemObject, {
            shouldIncrement: false,
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
        onPaneMouseMove,
        onPaneMouseEnter,
        onPaneMouseLeave,
        onPaneClick,
        onPaneReady,
        onMove,
        onViewportChangeEnd,
    };
}
