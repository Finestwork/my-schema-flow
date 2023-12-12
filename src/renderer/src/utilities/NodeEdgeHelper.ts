import type { TEdge, TElement } from '@stores/TableStore';
import { NodeId } from '@vue-flow/core/dist/context';
import { klona } from 'klona';

/**
 * Calculate the position of the node and determine which node handle should be used
 */
export const calculateEdgePosition = (edge: TEdge) => {
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

/**
 * Returns a filtered list of edges based on the given active node
 */
export const getActiveEdges = (
    currentActiveNode: TElement | Record<string, never>,
    edges: TEdge[],
) => {
    const NodeId = currentActiveNode.id;
    return klona(edges).filter((edge) => edge.source === NodeId || edge.target === NodeId);
};

/**
 * Resets the active edges state
 */
export const resetActiveEdgesState = (edge: TEdge[]) => {
    return edge.map((edge) => {
        return Object.assign(edge, {
            style: {},
            animated: false,
        });
    });
};

/**
 * Creates a new array of edges with updated styles and animation status.
 */
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

export const getConnectedNodes = (
    currentNode: TElement | Record<string, never>,
    edges: TEdge[],
) => {
    const CurrentNodeId = currentNode.id;
    const Related = klona(edges)
        .filter((edge) => {
            return edge.target === CurrentNodeId || edge.source === CurrentNodeId;
        })
        .map((edge) => Object.assign({}, edge));
    const Unrelated = klona(edges)
        .filter((edge) => {
            return edge.target !== CurrentNodeId && edge.source !== CurrentNodeId;
        })
        .map((edge) => Object.assign({}, edge));

    return {
        related: Related,
        unrelated: Unrelated,
    };
};

export const extractNodeIdFromEdge = (edges: TEdge[]) => {
    const NodeIds = [];
    edges.forEach((edge) => {
        const SourceNodeId = edge.sourceNode.id;
        const TargetNodeId = edge.targetNode.id;
        if (!NodeIds.includes(SourceNodeId)) {
            NodeIds.push(SourceNodeId);
        }
        if (!NodeIds.includes(TargetNodeId)) {
            NodeIds.push(TargetNodeId);
        }
    });

    return NodeIds;
};
