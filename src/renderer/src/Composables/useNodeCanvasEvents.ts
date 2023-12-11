import { useTableStore } from '@stores/TableStore';
import { useHistoryStore } from '@stores/HistoryStore';
import { useCanvasMinimap } from '@composables/useCanvasMinimap';
import {
    calculateEdgePosition,
    getActiveEdges,
    getConnectedNodes,
} from '@utilities/NodeEdgeHelper';
import { useDebounceFn } from '@vueuse/core';
import { useVueFlow } from '@vue-flow/core';
import { klona } from 'klona';
import type { Ref } from 'vue';
import type { MiniMap } from '@vue-flow/minimap';
import type { TElement, TEdge } from '@stores/TableStore';

export function useNodeCanvasEvents(minimap: Ref<typeof MiniMap>) {
    const tableStore = useTableStore();
    const historyStore = useHistoryStore();
    const { unHighlightMinimapNodes, highlightMinimapNodes } = useCanvasMinimap(minimap);
    const {
        getEdges,
        getNodes,
        onNodeClick,
        onNodeDrag,
        onNodeDragStart,
        onNodeDragStop,
        onPaneClick,
    } = useVueFlow();
    const PreviousNodePosition = {
        x: -1,
        y: -1,
    };

    const _handleNodeActiveState = (node: TElement) => {
        unHighlightMinimapNodes();

        // Unhighlight the current active nodes
        const ConnectedNodes = getConnectedNodes(tableStore.currentActiveNode, getEdges.value);
        ConnectedNodes.related.forEach((edge: TEdge) => {
            const Edge = getEdges.value.find((ed: TEdge) => ed.id === edge.id);
            Edge.style = {};
            Edge.animated = false;
            Edge.sourceNode.data.state.isActive = false;
            Edge.targetNode.data.state.isActive = false;
        });
        ConnectedNodes.unrelated.forEach((edge: TEdge) => {
            const Edge = getEdges.value.find((ed: TEdge) => ed.id === edge.id);
            Edge.style = {
                opacity: 1,
            };
            Edge.sourceNode.data.style.opacity = 1;
            Edge.targetNode.data.style.opacity = 1;
        });

        // If the current node is not the same with previously dragged node
        if (tableStore.currentActiveNode.id !== node.id) {
            tableStore.currentActiveEdgeIndex = -1;
        }

        // Save the current active node
        const CurrentActiveNode = klona(node);
        tableStore.currentActiveNode = CurrentActiveNode;
        tableStore.currentActiveEdges = getActiveEdges(CurrentActiveNode, getEdges.value);

        // Display the active state of all nodes
        const Nodes = getConnectedNodes(CurrentActiveNode, getEdges.value);
        Nodes.related.forEach((edge: TEdge) => {
            const Edge = getEdges.value.find((ed: TEdge) => ed.id === edge.id);
            Edge.style = {
                stroke: '#3b82f6',
            };
            Edge.animated = true;
            Edge.sourceNode.data.state.isActive = true;
            Edge.targetNode.data.state.isActive = true;
        });
        Nodes.unrelated.forEach((ed: TEdge) => {
            const Edge = getEdges.value.find((element: TEdge) => element.id === ed.id);
            Edge.style = {
                opacity: 0.5,
            };
            const SourceId = Edge.sourceNode.id;
            const TargetId = Edge.targetNode.id;
            const SourceIndex = Nodes.related.findIndex(
                (edge: TEdge) => edge.sourceNode.id === SourceId || edge.targetNode.id === SourceId,
            );
            const TargetIndex = Nodes.related.findIndex(
                (edge: TEdge) => edge.sourceNode.id === TargetId || edge.targetNode.id === TargetId,
            );
            if (TargetIndex === -1) {
                Edge.targetNode.data.style.opacity = 0.5;
            }
            if (SourceIndex === -1) {
                Edge.sourceNode.data.style.opacity = 0.5;
            }
        });

        // Display the minimap active state
        highlightMinimapNodes(tableStore.currentActiveEdges);
    };

    /**
     * Remove the active state of all nodes and edges
     */
    onPaneClick(() => {
        unHighlightMinimapNodes();
        getNodes.value.forEach((node) => {
            node.data.state.isActive = false;
            node.data.style.opacity = 1;
            getEdges.value.forEach((edge) => {
                edge.style = {};
                edge.animated = false;
                edge.sourceNode.data.state.isActive = false;
                edge.targetNode.data.state.isActive = false;
            });
        });
    });

    onNodeClick((event) => {
        _handleNodeActiveState(event.node);
    });

    /**
     * Capture the previous state of node being dragged
     */
    onNodeDragStart((event) => {
        PreviousNodePosition.position = Object.assign({}, event.node.position);
    });

    /**
     * Compare the previous state of the node to determine if the position has been changed
     */
    onNodeDragStop((event) => {
        const Node = event.node;
        const positionChanged =
            PreviousNodePosition.position.x !== Node.position.x &&
            PreviousNodePosition.position.y !== Node.position.y;
        if (!positionChanged) return;

        _handleNodeActiveState(Node);
        const ItemObj = {
            description: `'${Node.data.table.name}' table was moved`,
            payload: {
                nodes: getNodes.value,
                edges: getEdges.value,
                currentActiveNode: tableStore.currentActiveNode,
                currentActiveEdges: tableStore.currentActiveEdges,
                currentActiveEdgeIndex: tableStore.currentActiveEdgeIndex,
            },
        };
        historyStore.addItem(ItemObj);
    });

    onNodeDrag(
        useDebounceFn(() => {
            tableStore.currentActiveEdges.forEach((edge) => {
                const Edge = getEdges.value.find((ed: TEdge) => ed.id === edge.id);
                const { targetHandle, sourceHandle } = calculateEdgePosition(Edge);
                Edge.sourceHandle = sourceHandle;
                Edge.targetHandle = targetHandle;
            });
        }, 150),
    );
}
