import { useTableStore } from '@stores/TableStore';
import { useHistoryStore } from '@stores/HistoryStore';
import { calculateEdgePosition } from '@utilities/NodeEdgeHelper';
import { useVueFlow } from '@vue-flow/core';
import { toValue } from 'vue';
import { klona } from 'klona/full';
import type { TAddOptions } from '@stores/HistoryStore';

export function useHistory() {
    const tableStore = useTableStore();
    const historyStore = useHistoryStore();
    const { getNodes, getEdges, setNodes, setEdges } = useVueFlow();

    const addHistory = (description: string, options: TAddOptions = {}) => {
        const ItemObject = {
            description: description,
            payload: {
                nodes: getNodes.value,
                edges: getEdges.value,
                currentActiveNode: tableStore.currentActiveNode,
                currentActiveEdges: tableStore.currentActiveEdges,
                currentActiveEdgeIndex: tableStore.currentActiveEdgeIndex,
            },
        };

        const OnSaveOptions = toValue(options)?.onSave ?? {};
        historyStore.addItem(ItemObject, OnSaveOptions);
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
