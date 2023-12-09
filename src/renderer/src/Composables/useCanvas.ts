import { useTableStore } from '@stores/TableStore';
import { useTablePlaceholder } from '@composables/useTablePlaceholder';
import { resetActiveNodeState } from '@utilities/NodeHelper';
import { useSortTableColumns } from '@composables/useSortTableColumns';
import { useAutoLayout } from '@composables/useAutoLayout';
import {
    resetActiveEdgesState,
    animateEdges,
    calculateEdgePosition,
    getActiveEdges,
} from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { computed, nextTick, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import type { MaybeRefOrGetter } from 'vue';

export function useCanvas(tablePlaceholder: MaybeRefOrGetter) {
    const tableStore = useTableStore();
    const isDragging = ref(false);
    const isMouseEntered = ref(false);
    const { placeholderPosition, resetPlaceholderPosition, movePlaceholder } =
        useTablePlaceholder(tablePlaceholder);
    const { sortAllColumnsInTables } = useSortTableColumns();
    const { addNodes } = useVueFlow();
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
    const onNodeClick = (event) => {
        tableStore.currentActiveNode = resetActiveNodeState(tableStore.currentActiveNode);
        tableStore.currentActiveEdges = resetActiveEdgesState(tableStore.currentActiveEdges);
        tableStore.currentActiveNode = { ...event.node };
        tableStore.currentActiveNode.data.state.isActive = true;
        tableStore.currentActiveEdges = getActiveEdges(
            tableStore.currentActiveNode,
            tableStore.edges,
        );
        tableStore.currentActiveEdges = animateEdges(tableStore.currentActiveEdges);
    };
    const onNodeDrag = useDebounceFn((event) => {
        tableStore.currentActiveNode = resetActiveNodeState(tableStore.currentActiveNode);
        tableStore.currentActiveEdges = resetActiveEdgesState(tableStore.currentActiveEdges);

        // If the current node is not the same with previously dragged node
        if (tableStore.currentActiveNode.id !== event.node.id) {
            tableStore.currentActiveEdgeIndex = -1;
        }
        tableStore.currentActiveNode = { ...event.node };
        tableStore.currentActiveNode.data.state.isActive = true;
        tableStore.currentActiveEdges = getActiveEdges(
            tableStore.currentActiveNode,
            tableStore.edges,
        );
        tableStore.currentActiveEdges = animateEdges(tableStore.currentActiveEdges);
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
        tableStore.currentActiveNode = resetActiveNodeState(tableStore.currentActiveNode);
        tableStore.currentActiveEdges = resetActiveEdgesState(tableStore.currentActiveEdges);
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

    return {
        tableStore,
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
    };
}
