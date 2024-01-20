import dagre from 'dagre';
import { klona } from 'klona';
import type { TNode, TEdge } from '@stores/Canvas';

/**
 * Calculate node positions based on the node direction
 */
export function nodeAutolayout(nodes, edges, direction = 'TB') {
    const Nodes = klona(nodes);
    const Edges = klona(edges);
    const dagreGraph = new dagre.graphlib.Graph();
    const isHorizontal = direction === 'LR';
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    Nodes.forEach((node) => {
        const { width, height } = node.dimensions;
        dagreGraph.setNode(node.id, { width: width, height: height });
    });
    Edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    Nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';
        const { width } = node.dimensions;
        node.position = {
            x: nodeWithPosition.x * 1.2 - width / 2, // Add space to the left
            y: nodeWithPosition.y * 1.6, // Add space to the top
        };

        return node;
    });

    return { nodes: Nodes, edges: Edges };
}

/**
 * Calculate the position of the node and determine which node handle should be used
 */
export const calculateEdgePosition = (edge: TEdge) => {
    const SourceNode = edge.sourceNode;
    const TargetNode = edge.targetNode;
    const NodeWidth = TargetNode.dimensions.width;
    const NodeHeight = TargetNode.dimensions.height;

    const createObject = (target, source) => {
        return {
            target,
            source,
        };
    };
    if (TargetNode.position.x + NodeWidth < SourceNode.position.x) {
        // NorthWest
        if (TargetNode.position.y + NodeHeight < SourceNode.position.y) {
            return createObject('right', 'top');
        }
        // SouthWest
        else if (TargetNode.position.y > SourceNode.position.y + NodeHeight) {
            return createObject('right', 'bottom');
        }
        // West
        else {
            return createObject('right', 'left');
        }
    } else if (TargetNode.position.x > SourceNode.position.x + NodeWidth) {
        // NorthEast
        if (TargetNode.position.y + NodeHeight < SourceNode.position.y) {
            return createObject('left', 'top');
        }
        // SouthEast
        else if (TargetNode.position.y > SourceNode.position.y + NodeHeight) {
            return createObject('left', 'bottom');
        }
        // East
        else {
            return createObject('left', 'right');
        }
    } else {
        // North
        if (TargetNode.position.y + NodeHeight < SourceNode.position.y) {
            return createObject('bottom', 'top');
        }
        // South
        else if (TargetNode.position.y > SourceNode.position.y + NodeHeight) {
            return createObject('top', 'bottom');
        } else {
            return createObject('top', 'top');
        }
    }
};

/**
 * Get all related and unrelated nodes based on the given active node
 */
export const getConnectedNodes = (
    currentNode: TNode | Record<string, never>,
    edges: Array<TEdge>,
) => {
    const CurrentNodeId = currentNode.id;
    const Related = klona(edges)
        .filter((edge) => {
            return (
                edge.target === CurrentNodeId || edge.source === CurrentNodeId
            );
        })
        .map((edge) => Object.assign({}, edge));
    const Unrelated = klona(edges)
        .filter((edge) => {
            return (
                edge.target !== CurrentNodeId && edge.source !== CurrentNodeId
            );
        })
        .map((edge) => Object.assign({}, edge));

    return {
        related: Related,
        unrelated: Unrelated,
    };
};

/**
 * Returns a filtered list of edges based on the given active node
 */
export const getActiveEdges = (
    currentActiveNode: TNode | Record<string, never>,
    edges: Array<TEdge>,
) => {
    const NodeId = currentActiveNode.id;
    return klona(edges).filter(
        (edge) => edge.source === NodeId || edge.target === NodeId,
    );
};

/**
 * Returns a filtered list of edges based on the given active node
 */
export const getNodeRelationship = (
    currentActiveNode: TNode | Record<string, never>,
    edges: TEdge[],
) => {
    const NodeId = currentActiveNode.id;
    return klona(edges).filter(
        (edge) => edge.source === NodeId || edge.target === NodeId,
    );
};

/**
 * Find node by id
 */
export const findNode = (id: string, nodes: Array<TNode>) => {
    return nodes.find((node) => node.id === id);
};

/**
 * Find node by table name
 */
export const findNodeByTableName = (name: string, nodes: Array<TNode>) => {
    return nodes.find((node) => node.data.table.name === name);
};

/**
 * Resets all the properties that make nodes active
 */
export const resetNodesActiveState = (nodes: Array<TNode>) => {
    return klona(nodes).map((node) => {
        node.data.states = {
            isActive: false,
            isFaded: false,
        };

        node.zIndex = 0;

        return node;
    });
};

/**
 * Resets all the properties that make edges active
 */
export const resetEdgesActiveState = (edges: Array<TEdge>) => {
    return klona(edges).map((edge) => {
        edge.class = '';
        edge.style = {};
        edge.animated = false;
        edge.zIndex = 0;
        return edge;
    });
};
