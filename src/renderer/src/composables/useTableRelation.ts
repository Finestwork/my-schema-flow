import { useTableStore } from '@renderer/stores/TableStore';
import { computed } from 'vue';
import type { TEdgeData } from '@renderer/stores/TableStore';
import type { Edge } from '@vue-flow/core';
import type { ComputedRef } from 'vue';

export function useTableRelation() {
    const tableStore = useTableStore();
    const currentActiveEdge: ComputedRef<Edge & { data: TEdgeData }> = computed(
        () => tableStore.currentActiveEdges[tableStore.currentActiveEdgeIndex],
    );
    const noActiveEdge = computed(() => tableStore.currentActiveEdgeIndex === -1);

    return {
        tableStore,
        currentActiveEdge,
        noActiveEdge,
    };
}
