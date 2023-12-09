import type { TEdge, TElement } from '@stores/TableStore';

export const calculateEdgePosition = (edge) => {
    const SourceNode = edge.sourceNode;
    const TargetNode = edge.targetNode;
    const nodeWidth = TargetNode.dimensions.width;
    const nodeHeight = TargetNode.dimensions.height;

    const createObject = (targetHandle, sourceHandle) => {
        return {
            targetHandle,
            sourceHandle,
        };
    };

    if (TargetNode.position.x + nodeWidth < SourceNode.position.x) {
        // NorthWest
        if (TargetNode.position.y + nodeHeight < SourceNode.position.y) {
            return createObject('target-right', 'source-top');
        }
        // SouthWest
        else if (TargetNode.position.y > SourceNode.position.y + nodeHeight) {
            return createObject('target-right', 'source-bottom');
        }
        // West
        else {
            return createObject('target-right', 'source-left');
        }
    } else if (TargetNode.position.x > SourceNode.position.x + nodeWidth) {
        // NorthEast
        if (TargetNode.position.y + nodeHeight < SourceNode.position.y) {
            return createObject('target-left', 'source-top');
        }
        // SouthEast
        else if (TargetNode.position.y > SourceNode.position.y + nodeHeight) {
            return createObject('target-left', 'source-bottom');
        }
        // East
        else {
            return createObject('target-left', 'source-right');
        }
    } else {
        // North
        if (TargetNode.position.y + nodeHeight < SourceNode.position.y) {
            return createObject('target-bottom', 'source-top');
        }
        // South
        else if (TargetNode.position.y > SourceNode.position.y + nodeHeight) {
            return createObject('target-top', 'source-bottom');
        } else {
            return createObject('target-top', 'source-top');
        }
    }
};

export const getActiveEdges = (
    currentActiveNode: TElement | Record<string, never>,
    edges: TEdge[],
) => {
    const NodeId = currentActiveNode.id;
    return edges.filter((edge) => edge.source === NodeId || edge.target === NodeId);
};

export const resetActiveEdgesState = (edge: TEdge[]) => {
    return edge.map((edge) => {
        return Object.assign(edge, {
            style: {},
            animated: false,
        });
    });
};

export const animateEdges = (currentActiveEdges: TEdge[]) => {
    return currentActiveEdges.map((edge) => {
        const StyleObject = Object.assign(edge, {
            style: {
                stroke: '#3b82f6',
            },
            animated: true,
        });
        return Object.assign(edge, StyleObject);
    });
};
