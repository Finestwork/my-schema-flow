import { useCanvasStore } from '@stores/Canvas';
import { getConnectedNodes } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';
import type { GraphEdge } from '@vue-flow/core';

export function useNodeStateHandler() {
    const canvasStore = useCanvasStore();
    const { getEdges, setNodes, setEdges } = useVueFlow();

    const resetState = () => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                node.data.style.opacity = 1;
                node.data.state.isActive = false;
                return node;
            });
        });
        setEdges((edges) => {
            return edges.map((edge) => {
                edge.style = {};
                edge.animated = false;
                return edge;
            });
        });
    };
    const activateState = () => {
        const nodes = getConnectedNodes(
            canvasStore.currentActiveNode,
            getEdges.value,
        );
        nodes.related.forEach((edge: GraphEdge) => {
            const Edge = getEdges.value.find(
                (ed: GraphEdge) => ed.id === edge.id,
            );
            Edge.style = {
                stroke: '#22d3ee',
            };
            Edge.animated = true;
            Edge.sourceNode.data.states = {
                isActive: true,
                isFaded: false,
            };
            Edge.targetNode.data.states = {
                isActive: true,
                isFaded: false,
            };
        });
        nodes.unrelated.forEach((ed: GraphEdge) => {
            const Edge = getEdges.value.find(
                (element: GraphEdge) => element.id === ed.id,
            );
            Edge.style = {
                opacity: 0.5,
            };
            const SourceId = Edge.sourceNode.id;
            const TargetId = Edge.targetNode.id;
            const SourceIndex = nodes.related.findIndex(
                (edge: GraphEdge) =>
                    edge.sourceNode.id === SourceId ||
                    edge.targetNode.id === SourceId,
            );
            const TargetIndex = nodes.related.findIndex(
                (edge: GraphEdge) =>
                    edge.sourceNode.id === TargetId ||
                    edge.targetNode.id === TargetId,
            );
            if (TargetIndex === -1) {
                Edge.targetNode.data.states = {
                    isActive: false,
                    isFaded: true,
                };
            }

            if (SourceIndex === -1) {
                Edge.sourceNode.data.states = {
                    isActive: false,
                    isFaded: true,
                };
            }
        });
    };
    const deactivateState = () => {
        const ConnectedNodes = getConnectedNodes(
            canvasStore.currentActiveNode,
            getEdges.value,
        );
        ConnectedNodes.related.forEach((edge: GraphEdge) => {
            const Edge = getEdges.value.find(
                (ed: GraphEdge) => ed.id === edge.id,
            );
            Edge.style = {};
            Edge.animated = false;
            Edge.sourceNode.data.states = {
                isActive: false,
                isFaded: false,
            };
            Edge.targetNode.data.states = {
                isActive: false,
                isFaded: false,
            };
        });
        ConnectedNodes.unrelated.forEach((edge: GraphEdge) => {
            const Edge = getEdges.value.find(
                (ed: GraphEdge) => ed.id === edge.id,
            );
            Edge.style = {
                opacity: 1,
            };
            Edge.sourceNode.data.states = {
                isActive: false,
                isFaded: false,
            };
            Edge.targetNode.data.states = {
                isActive: false,
                isFaded: false,
            };
        });
    };

    return {
        resetState,
        activateState,
        deactivateState,
    };
}
