import { useCanvasStore } from '@stores/Canvas';
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
                    edge.style = {
                        stroke: settingsStore.isDarkMode
                            ? '#22d3ee'
                            : '#0e7490',
                    };
                    edge.animated = true;
                    edge.zIndex = 98;
                    NodeIds.add(edge.targetNode.id);
                    NodeIds.add(edge.sourceNode.id);
                    return edge;
                }

                edge.style = {
                    stroke: settingsStore.isDarkMode ? '#272F45' : '#cbd5e1',
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

    return {
        resetState,
        activateState,
    };
}
