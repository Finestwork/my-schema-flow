import { useTableStore } from '@stores/TableStore';
import { useHistoryStore } from '@stores/HistoryStore';
import { useVueFlow } from '@vue-flow/core';
import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { TAddOptions } from '@stores/HistoryStore';
import { klona } from 'klona/full';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';

export type TOptions = {
    onSave: TAddOptions;
};

export function useHistory(
    options: MaybeRefOrGetter<TOptions | Record<string, never>> = {},
) {
    const tableStore = useTableStore();
    const historyStore = useHistoryStore();
    const { getNodes, getEdges, setNodes, setEdges } = useVueFlow();

    const addHistory = () => {
        const ItemObject = {
            description: 'Initial Load',
            payload: {
                nodes: getNodes.value,
                edges: getEdges.value,
                currentActiveNode: tableStore.currentActiveNode,
                currentActiveEdges: tableStore.currentActiveEdges,
                currentActiveEdgeIndex: tableStore.currentActiveEdgeIndex,
            },
        };

        historyStore.addItem(ItemObject, toValue(options).onSave);
    };

    const updateNodesAndEdges = () => {
        setNodes(() => {
            return historyStore.currentValue.payload.nodes.map((node) =>
                klona(node),
            );
        });
        setEdges(() => {
            return historyStore.currentValue.payload.edges.map((edge) => {
                edge.animated ??= edge?.animated ?? false;
                edge.style ??= edge?.style ?? {};
                const { targetHandle, sourceHandle } =
                    calculateEdgePosition(edge);
                edge.sourceHandle = sourceHandle;
                edge.targetHandle = targetHandle;

                return klona(edge);
            });
        });
    };

    return {
        addHistory,
        updateNodesAndEdges,
    };
}
