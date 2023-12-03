export function useCalculateHandlePosition(edge) {
    const SourceNode = edge.sourceNode;
    const TargetNode = edge.targetNode;
    const nodeWidth = TargetNode.dimensions.width;
    const nodeHeight = TargetNode.dimensions.height;

    if (TargetNode.position.x + nodeWidth < SourceNode.position.x) {
        // NorthWest
        if (TargetNode.position.y + nodeHeight < SourceNode.position.y) {
            edge.targetHandle = 'target-right';
            edge.sourceHandle = 'source-top';
        }
        // SouthWest
        else if (TargetNode.position.y > SourceNode.position.y + nodeHeight) {
            edge.targetHandle = 'target-right';
            edge.sourceHandle = 'source-bottom';
        }
        // West
        else {
            edge.targetHandle = 'target-right';
            edge.sourceHandle = 'source-left';
        }
    } else if (TargetNode.position.x > SourceNode.position.x + nodeWidth) {
        // NorthEast
        if (TargetNode.position.y + nodeHeight < SourceNode.position.y) {
            edge.targetHandle = 'target-left';
            edge.sourceHandle = 'source-top';
        }
        // SouthEast
        else if (TargetNode.position.y > SourceNode.position.y + nodeHeight) {
            edge.targetHandle = 'target-left';
            edge.sourceHandle = 'source-bottom';
        }
        // East
        else {
            edge.targetHandle = 'target-left';
            edge.sourceHandle = 'source-right';
        }
    } else {
        // North
        if (TargetNode.position.y + nodeHeight < SourceNode.position.y) {
            edge.targetHandle = 'target-bottom';
            edge.sourceHandle = 'source-top';
        }
        // South
        else if (TargetNode.position.y > SourceNode.position.y + nodeHeight) {
            edge.targetHandle = 'target-top';
            edge.sourceHandle = 'source-bottom';
        } else {
            edge.targetHandle = 'target-top';
            edge.sourceHandle = 'source-top';
        }
    }
}
