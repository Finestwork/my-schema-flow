import { TNode, useCanvasStore } from '@stores/CanvasStore';
import { getNodeRelationship } from '@utilities/CanvasHelper';
import type { Ref } from 'vue';
import type { TEdge } from '@stores/CanvasStore';
import { ref, watch } from 'vue';
import { getRelationList } from '@utilities/TableHelper';
import { watchOnce } from '@vueuse/core';

export function useTableRelationList(
    edges: Ref<Array<TEdge>>,
    nodes: Ref<Array<TNode>>,
) {
    const canvasStore = useCanvasStore();
    const CurrentActiveEdges = getNodeRelationship(
        canvasStore.currentActiveNode,
        edges.value,
    );
    const RelationList = getRelationList(
        CurrentActiveEdges,
        nodes.value,
        canvasStore.currentActiveNode.id,
    );
    const relationList = ref(RelationList);

    // computed property can't be used because edges are being updated always
    watch(
        () => canvasStore.currentActiveNode,
        () => {
            const CurrentActiveEdges = getNodeRelationship(
                canvasStore.currentActiveNode,
                edges.value,
            );
            relationList.value = getRelationList(
                CurrentActiveEdges,
                nodes.value,
                canvasStore.currentActiveNode.id,
            );
        },
        { flush: 'post' },
    );

    return {
        relationList,
    };
}
