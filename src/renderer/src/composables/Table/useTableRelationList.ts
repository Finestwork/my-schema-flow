import { useCanvasStore } from '@stores/Canvas';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import { getRelationList } from '@utilities/TableHelper';
import { vueFlowKey } from '@symbols/VueFlow';
import { inject, computed } from 'vue';

export function useTableRelationList() {
    const canvasStore = useCanvasStore();
    const { getNodes, getEdges } = inject(vueFlowKey);
    const relationList = computed(() => {
        const CurrentActiveEdges = getNodeRelationship(
            canvasStore.currentActiveNode,
            getEdges.value,
        );
        return getRelationList(
            CurrentActiveEdges,
            getNodes.value,
            canvasStore.currentActiveNode.id,
        );
    });

    return {
        relationList,
    };
}
