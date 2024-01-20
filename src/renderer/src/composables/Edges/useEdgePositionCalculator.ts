import { useCanvasStore } from '@stores/Canvas';
import {
    getActiveEdges,
    calculateEdgePosition as calculate,
} from '@utilities/CanvasHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, nextTick } from 'vue';

export function useEdgePositionCalculator() {
    const canvasStore = useCanvasStore();
    const VueFlow = inject(vueFlowKey);

    const calculateAllEdgesPosition = async () => {
        if (!VueFlow) return;
        VueFlow.setEdges((edges) => {
            return edges.map((edge) => {
                const { target, source } = calculate(edge);
                edge.data.position = {
                    source,
                    target,
                };
                edge.sourceHandle = `${edge.targetNode.id}-${edge.sourceNode.id}`;
                edge.targetHandle = `${edge.targetNode.id}-${edge.sourceNode.id}`;
                return edge;
            });
        });
        await nextTick();
        VueFlow.updateNodeInternals();
    };
    const calculateActiveEdgesPosition = async () => {
        if (!VueFlow) return;

        const ActiveEdges = getActiveEdges(
            canvasStore.currentActiveNode,
            VueFlow.getEdges.value,
        );
        VueFlow.setEdges((edges) => {
            return edges.map((edge) => {
                const edgeId = edge.id;
                const edgeExistence = ActiveEdges.find((e) => e.id === edgeId);
                if (!edgeExistence) return edge;
                const { target, source } = calculate(edge);
                edge.data.position = {
                    source,
                    target,
                };
                edge.sourceHandle = `${edge.targetNode.id}-${edge.sourceNode.id}`;
                edge.targetHandle = `${edge.targetNode.id}-${edge.sourceNode.id}`;
                return edge;
            });
        });
        await nextTick();
        VueFlow.updateNodeInternals();
    };

    return {
        calculateAllEdgesPosition,
        calculateActiveEdgesPosition,
    };
}
