import { useTableRelation } from '@renderer/composables/useTableRelation';
import { calculateEdgePosition } from '@renderer/utilities/NodeEdgeHelper';
import { nodeAutolayout } from '@renderer/utilities/NodeHelper';
import { sortConstraintKeys } from '@renderer/utilities/TableColumnHelper';
import { useDebounceFn } from '@vueuse/core';

export function useCanvas() {
    const { tableStore, currentActiveEdges } = useTableRelation();
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
    const onPaneClick = () => {
        resetActiveState();
        tableStore.currentActiveNode = {};
        tableStore.currentActiveEdges = [];
        if (tableStore.currentActiveEdgeIndex !== -1) {
            tableStore.currentActiveEdgeIndex = -1;
        }
    };
    const onMove = () => {
        resetActiveState();
        tableStore.currentActiveNode = {};
        tableStore.currentActiveEdges = [];
        if (tableStore.currentActiveEdgeIndex !== -1) {
            tableStore.currentActiveEdgeIndex = -1;
        }
    };
    const onPaneReady = () => {
        tableStore.elements = tableStore.elements.map((element) => {
            const Columns = element.data.table.columns;
            element.data.table.columns = sortConstraintKeys(Columns);
            return element;
        });
        const { nodes, edges } = nodeAutolayout(tableStore.elements, tableStore.edges);
        tableStore.elements = nodes;
        tableStore.edges = edges;
        tableStore.edges.forEach(calculateEdgePosition);
    };

    return {
        tableStore,
        onNodeClick,
        onNodeDrag,
        onPaneClick,
        onMove,
        onPaneReady,
    };
}
