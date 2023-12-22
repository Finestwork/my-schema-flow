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
                node.data.states = {
                    isActive: false,
                    isFaded: false,
                };
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
        const NodeIds = new Set();
        const { related } = getConnectedNodes(
            canvasStore.currentActiveNode,
            getEdges.value,
        );

        canvasStore.currentActiveNode.data.states = {
            isActive: true,
            isFaded: false,
        };

        setEdges((edges) => {
            return edges.map((edge) => {
                const RelatedIndex = related.findIndex((e) => e.id === edge.id);

                if (RelatedIndex !== -1) {
                    edge.style = {
                        stroke: '#22d3ee',
                    };
                    edge.animated = true;
                    NodeIds.add(edge.targetNode.id);
                    NodeIds.add(edge.sourceNode.id);
                    return edge;
                }

                edge.style = {
                    stroke: '#272F45',
                };
                edge.animated = false;
                edge.sourceNode.data.states = {
                    isActive: false,
                    isFaded: true,
                };
                edge.targetNode.data.states = {
                    isActive: false,
                    isFaded: true,
                };

                return edge;
            });
        });

        setNodes((nodes) => {
            return nodes.map((node) => {
                const NodeIndex = Array.from(NodeIds).findIndex(
                    (id) => id === node.id,
                );

                if (NodeIndex !== -1) {
                    node.data.states = {
                        isActive: true,
                        isFaded: false,
                    };
                } else {
                    node.data.states = {
                        isActive: false,
                        isFaded: true,
                    };
                }

                return node;
            });
        });
    };

    return {
        resetState,
        activateState,
    };
}
