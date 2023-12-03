import dagre from 'dagre';

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
        const { width, height } = node.dimensions;
        node.position = {
            x: nodeWithPosition.x * 1.2 - width / 2, // Add space to the left
            y: nodeWithPosition.y * 1.2 - height / 2, // Add space to the top
        };

        return node;
    });

    return { nodes: Nodes, edges: Edges };
}
