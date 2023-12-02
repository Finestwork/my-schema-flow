import { TEdgeData, useTableStore } from '@stores/TableStore';
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { Edge } from '@vue-flow/core';

export function useTableRelation() {
    const TableStore = useTableStore();
    const currentActiveEdges: ComputedRef<(Edge & { data: TEdgeData })[]> = computed(() => {
        const ActiveNode = TableStore.currentActiveNode;
        const NodeId = ActiveNode.id;
        return TableStore.edges.filter((edge) => edge.source === NodeId || edge.target === NodeId);
    });
    const currentActiveEdge: ComputedRef<Edge & { data: TEdgeData }> = computed(
        () => currentActiveEdges.value[TableStore.currentActiveEdgeIndex],
    );
    const noActiveEdge = computed(() => TableStore.currentActiveEdgeIndex === -1);

    return {
        tableStore: TableStore,
        currentActiveEdges,
        currentActiveEdge,
        noActiveEdge,
    };
}
