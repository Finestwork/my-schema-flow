import dagre from 'dagre';
import type { GraphEdge } from '@vue-flow/core';

/**
 * Calculate node positions based on the node direction
 */
export function nodeAutolayout(nodes, edges, direction = 'TB') {
    const Nodes = nodes.slice();
    const Edges = edges.slice();
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
export const calculateEdgePosition = (edge: GraphEdge) => {
    const SourceNode = edge.sourceNode;
    const TargetNode = edge.targetNode;
    const NodeWidth = TargetNode.dimensions.width;
    const NodeHeight = TargetNode.dimensions.height;

    const createObject = (targetHandle, sourceHandle) => {
        return {
            targetHandle,
            sourceHandle,
        };
    };

    if (TargetNode.position.x + NodeWidth < SourceNode.position.x) {
        // NorthWest
        if (TargetNode.position.y + NodeHeight < SourceNode.position.y) {
            return createObject('target-right', 'source-top');
        }
        // SouthWest
        else if (TargetNode.position.y > SourceNode.position.y + NodeHeight) {
            return createObject('target-right', 'source-bottom');
        }
        // West
        else {
            return createObject('target-right', 'source-left');
        }
    } else if (TargetNode.position.x > SourceNode.position.x + NodeWidth) {
        // NorthEast
        if (TargetNode.position.y + NodeHeight < SourceNode.position.y) {
            return createObject('target-left', 'source-top');
        }
        // SouthEast
        else if (TargetNode.position.y > SourceNode.position.y + NodeHeight) {
            return createObject('target-left', 'source-bottom');
        }
        // East
        else {
            return createObject('target-left', 'source-right');
        }
    } else {
        // North
        if (TargetNode.position.y + NodeHeight < SourceNode.position.y) {
            return createObject('target-bottom', 'source-top');
        }
        // South
        else if (TargetNode.position.y > SourceNode.position.y + NodeHeight) {
            return createObject('target-top', 'source-bottom');
        } else {
            return createObject('target-top', 'source-top');
        }
    }
};
