import { useTableStore } from '@stores/TableStore';
import { useHistoryStore } from '@stores/HistoryStore';
import { useVueFlow } from '@vue-flow/core';
import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { TAddOptions } from '@stores/HistoryStore';

export type TOptions = {
    onSave: TAddOptions;
};

export function useHistory(
    options: MaybeRefOrGetter<TOptions | Record<string, never>> = {},
) {
    const tableStore = useTableStore();
    const historyStore = useHistoryStore();
    const { getNodes, getEdges } = useVueFlow();
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
    return {
        addHistory,
    };
}
