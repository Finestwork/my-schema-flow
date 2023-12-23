import { useCanvasStore } from '@stores/Canvas';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import { getRelationList } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, ref, watch } from 'vue';
import type { Ref } from 'vue';

export type TRelationList = {
    id: string;
    table: string;
    column: string;
    relation: string;
};

export function useTableRelationList() {
    const canvasStore = useCanvasStore();
    const { getNodes, getEdges } = inject(vueFlowKey);

    const relationList: Ref<Array<TRelationList>> = ref([]);
    const updateRelationList = () => {
        const CurrentActiveEdges = getNodeRelationship(
            canvasStore.currentActiveNode,
            getEdges.value,
        );
        relationList.value = getRelationList(
            CurrentActiveEdges,
            getNodes.value,
            canvasStore.currentActiveNode.id,
        );
    };

    updateRelationList();
    watch(
        () => [getEdges.value, canvasStore.currentActiveNode],
        updateRelationList,
    );

    return {
        relationList,
    };
}
