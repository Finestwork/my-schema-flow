import { useSettingsStore } from '@stores/SettingsStore';
import { nodeAutolayout } from '@utilities/NodeHelper';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { klona } from 'klona';

export function useAutoLayout() {
    const settingsStore = useSettingsStore();
    const { getEdges, getNodes, setNodes, setEdges } = useVueFlow();

    const runAutoLayout = () => {
        const { nodes, edges } = nodeAutolayout(
            getNodes.value,
            getEdges.value,
            settingsStore.currentNodeOrientation,
        );
        setNodes(() => nodes.map((node) => klona(node)));
        setEdges(() => {
            return edges.map((edge) => {
                const { targetHandle, sourceHandle } =
                    calculateEdgePosition(edge);
                edge.sourceHandle = sourceHandle;
                edge.targetHandle = targetHandle;
                return klona(edge);
            });
        });
    };

    return {
        runAutoLayout,
    };
}
