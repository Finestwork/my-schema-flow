import { useCanvasStore } from '@stores/CanvasStore';
import { toValue, ref, computed } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { TNode } from '@stores/CanvasStore';

export function useSearchRelation(nodes: MaybeRefOrGetter<Array<TNode>>) {
    const canvasStore = useCanvasStore();
    const searchTerm = ref('');
    const getColumns = computed(() => {
        const CurrentTable = canvasStore.currentActiveNode.data.table.name;
        return toValue(nodes)
            .map((node) => node.data.table.name)
            .filter((name) => name !== CurrentTable);
    });
    return {
        searchTerm,
        getColumns,
    };
}
