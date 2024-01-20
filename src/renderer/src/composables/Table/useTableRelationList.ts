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
    const VueFlow = inject(vueFlowKey);

    const relationList: Ref<Array<TRelationList>> = ref([]);
    const updateRelationList = () => {
        if (!VueFlow) return;

        const CurrentActiveEdges = getNodeRelationship(
            canvasStore.currentActiveNode,
            VueFlow.getEdges.value,
        );
        relationList.value = getRelationList(
            CurrentActiveEdges,
            VueFlow.getNodes.value,
            canvasStore.currentActiveNode.id,
        );
    };

    updateRelationList();
    watch(() => [VueFlow, canvasStore.currentActiveNode], updateRelationList);

    return {
        relationList,
    };
}
