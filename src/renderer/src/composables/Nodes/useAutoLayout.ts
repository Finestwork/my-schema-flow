import { useSettingsStore } from '@stores/Settings';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { nodeAutolayout } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useNodeAutoLayout() {
    const settingsStore = useSettingsStore();
    const { calculateAllEdgesPosition } = useEdgePositionCalculator();
    const { getEdges, getNodes, setNodes, setEdges } = inject(vueFlowKey);
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
