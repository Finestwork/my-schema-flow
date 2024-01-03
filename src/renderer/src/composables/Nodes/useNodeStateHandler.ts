import { TEdge, useCanvasStore } from '@stores/Canvas';
import { getConnectedNodes } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';

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
                node.zIndex = 0;
                return node;
            });
        });
        setEdges((edges) => {
            return edges.map((edge) => {
                edge.class = '';
                edge.style = {};
                edge.animated = false;
                edge.zIndex = 0;
                edge.data.referenced.isHandleActive = false;
                edge.data.referencing.isHandleActive = false;
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

        setEdges((edges) => {
            return edges.map((edge) => {
                const RelatedIndex = related.findIndex((e) => e.id === edge.id);

                if (RelatedIndex !== -1) {
                    edge.class = 'active';
                    edge.animated = true;
                    edge.zIndex = 98;
                    edge.data.referenced.isHandleActive = true;
                    edge.data.referencing.isHandleActive = true;
                    NodeIds.add(edge.targetNode.id);
                    NodeIds.add(edge.sourceNode.id);
                    return edge;
                }

                edge.class = 'faded';
                edge.animated = false;
                edge.sourceNode.data.states = {
                    isActive: false,
                    isFaded: true,
                    isHandleActive: false,
                };
                edge.targetNode.data.states = {
                    isActive: false,
                    isFaded: true,
                    isHandleActive: false,
                };

                return edge;
            });
        });
        setNodes((nodes) => {
            return nodes.map((node) => {
                const NodeIndex = Array.from(NodeIds).findIndex(
                    (id) => id === node.id,
                );

                node.zIndex = 99;

                if (NodeIndex !== -1) {
                    if (canvasStore.currentActiveNode.id === node.id) {
                        node.data.states = {
                            isActive: true,
                            isFaded: false,
                        };
                    } else {
                        node.data.states = {
                            isActive: false,
                            isFaded: false,
                        };
                    }
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
    const activatePairNode = (edge: TEdge) => {
        setEdges((edges) => {
            return edges.map((currentEdge) => {
                if (edge.id === currentEdge.id) {
                    currentEdge.class = 'active';
                    currentEdge.animated = true;
                    currentEdge.zIndex = 98;
                    edge.data.referenced.isHandleActive = true;
                    edge.data.referencing.isHandleActive = true;
                    return edge;
                }

                currentEdge.class = 'faded';
                currentEdge.animated = false;

                return currentEdge;
            });
        });
        setNodes((nodes) => {
            return nodes.map((node) => {
                node.zIndex = 99;
                const MatchPairNode =
                    edge.sourceNode.id === node.id ||
                    edge.targetNode.id === node.id;

                if (MatchPairNode) {
                    if (canvasStore.currentActiveNode.id === node.id) {
                        node.data.states = {
                            isActive: true,
                            isFaded: false,
                        };
                    } else {
                        node.data.states = {
                            isActive: false,
                            isFaded: false,
                        };
                    }
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
        activatePairNode,
    };
}
