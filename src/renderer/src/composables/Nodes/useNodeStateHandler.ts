import { TEdge, useCanvasStore } from '@stores/Canvas';
import { useSettingsStore } from '@stores/Settings';
import { getConnectedNodes } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';

export function useNodeStateHandler() {
    const canvasStore = useCanvasStore();
    const settingsStore = useSettingsStore();
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
                    NodeIds.add(edge.targetNode.id);
                    NodeIds.add(edge.sourceNode.id);
                    return edge;
                }

                edge.class = 'inactive';
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

                node.zIndex = 99;

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
        canvasStore.currentActiveNode.data.states = {
            isActive: true,
            isFaded: false,
        };
    };
    const activatePairNode = (edge: TEdge) => {
        setEdges((edges) => {
            return edges.map((currentEdge) => {
                if (edge.id === currentEdge.id) {
                    currentEdge.class = 'active';
                    currentEdge.animated = true;
                    currentEdge.zIndex = 98;
                    return edge;
                }

                currentEdge.class = 'inactive';
                currentEdge.animated = false;
                currentEdge.sourceNode.data.states = {
                    isActive: false,
                    isFaded: true,
                };
                currentEdge.targetNode.data.states = {
                    isActive: false,
                    isFaded: true,
                };

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
        activatePairNode,
    };
}
