import { useCanvasStore } from '@stores/CanvasStore';
import { getConnectedNodes } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';
import type { GraphEdge } from '@vue-flow/core';

export function useConnectedNodes() {
    const canvasStore = useCanvasStore();
    const { getNodes, getEdges } = useVueFlow();
    const highlightNodes = () => {
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
            Edge.sourceNode.data.state.isActive = true;
            Edge.targetNode.data.state.isActive = true;
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
                Edge.targetNode.data.style.opacity = 0.5;
            }
            if (SourceIndex === -1) {
                Edge.sourceNode.data.style.opacity = 0.5;
            }
        });
    };
    const unhighlightNodes = () => {
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
            Edge.sourceNode.data.state.isActive = false;
            Edge.targetNode.data.state.isActive = false;
        });
        ConnectedNodes.unrelated.forEach((edge: GraphEdge) => {
            const Edge = getEdges.value.find(
                (ed: GraphEdge) => ed.id === edge.id,
            );
            Edge.style = {
                opacity: 1,
            };
            Edge.sourceNode.data.style.opacity = 1;
            Edge.targetNode.data.style.opacity = 1;
        });
    };

    return {
        highlightNodes,
        unhighlightNodes,
    };
}
