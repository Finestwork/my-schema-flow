import { nodeAutolayout } from '@utilities/NodeHelper';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { toValue } from 'vue';
import { klona } from 'klona';
import type { MaybeRefOrGetter } from 'vue';

export function useAutoLayout(orientation: MaybeRefOrGetter) {
    const { getEdges, getNodes, setNodes, setEdges } = useVueFlow();

    const runAutoLayout = () => {
        const { nodes, edges } = nodeAutolayout(
            getNodes.value,
            getEdges.value,
            toValue(orientation),
        );
        setNodes(() => nodes.map((node) => klona(node)));
        setEdges(() => {
            return edges.map((edge) => {
                const { targetHandle, sourceHandle } = calculateEdgePosition(edge);
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
