import { useSettingsStore } from '@stores/Settings';
import { useEdgePositionCalculator } from '@composables/Edges/useEdgePositionCalculator';
import { nodeAutolayout } from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function useNodeAutoLayout() {
    const settingsStore = useSettingsStore();
    const { calculateAllEdgesPosition } = useEdgePositionCalculator();
    const VueFlow = inject(vueFlowKey);
    const autoLayout = () => {
        if (!VueFlow) return;

        const { nodes, edges } = nodeAutolayout(
            VueFlow.getNodes.value,
            VueFlow.getEdges.value,
            settingsStore.currentOrientation,
        );
        console.log(nodes, edges);
        VueFlow.setNodes(() => nodes);
        VueFlow.setEdges(() => edges);
        calculateAllEdgesPosition();
    };

    return {
        autoLayout,
    };
}
