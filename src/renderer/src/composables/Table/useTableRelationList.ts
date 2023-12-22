import { useCanvasStore } from '@stores/Canvas';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import { getRelationList } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, ref, watch } from 'vue';

export function useTableRelationList() {
    const canvasStore = useCanvasStore();
    const { getNodes, getEdges } = inject(vueFlowKey);

    const CurrentActiveEdges = getNodeRelationship(
        canvasStore.currentActiveNode,
        getEdges.value,
    );
    const relationList = ref([]);
    const updateRelationList = () => {
        const InitialRelationList = getRelationList(
            CurrentActiveEdges,
            getNodes.value,
            canvasStore.currentActiveNode.id,
        );
        relationList.value = InitialRelationList;
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
