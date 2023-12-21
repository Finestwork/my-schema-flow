import { useSettingsStore } from '@stores/Settings';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { nodeAutolayout } from '@utilities/CanvasHelper';
import { useVueFlow } from '@vue-flow/core';

export function useNodeAutoLayout() {
    const settingsStore = useSettingsStore();
    const { calculateAllEdgesPosition } = useEdgePositionCalculator();
    const { getEdges, getNodes, setNodes, setEdges } = useVueFlow();
    const autoLayout = () => {
        const { nodes, edges } = nodeAutolayout(
            getNodes.value,
            getEdges.value,
            settingsStore.currentOrientation,
        );
        setNodes(() => nodes);
        setEdges(() => edges);
        calculateAllEdgesPosition();
    };

    return {
        autoLayout,
    };
}
