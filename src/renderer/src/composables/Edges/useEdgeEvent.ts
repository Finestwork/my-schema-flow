import { useCanvasStore } from '@stores/Canvas';
import { useNodeStateHandler } from '@composables/Nodes/useNodeStateHandler';
import { useHighlightColumnRelationship } from '@composables/Edges/useHighlightColumnRelationship';
import { useVueFlow } from '@vue-flow/core';

export function useEdgeEvents() {
    const canvasStore = useCanvasStore();
    const { highlightNodeColumnRelation, unhighlightColumnRelationship } =
        useHighlightColumnRelationship();
    const { activatePairNode } = useNodeStateHandler();
    const { onEdgeClick, onEdgeMouseEnter, onEdgeMouseLeave } = useVueFlow();

    onEdgeClick((event) => {
        const currentEdge = event.edge;
        canvasStore.currentActiveNode = currentEdge.sourceNode;
        activatePairNode(event.edge);
    });

    onEdgeMouseEnter(({ edge }) => highlightNodeColumnRelation(edge));

    onEdgeMouseLeave(unhighlightColumnRelationship);
}
