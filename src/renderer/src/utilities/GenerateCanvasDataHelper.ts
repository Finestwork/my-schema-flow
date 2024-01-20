import type {
    TGeneratedNodeData,
    TGeneratedEdgeData,
} from '@utilities/ImportHelper';

export const generateNodeDataForCanvas = (
    NodeData: Array<TGeneratedNodeData>,
) => {
    return NodeData.map((node, ind) => {
        return {
            id: node.id,
            type: 'custom',
            connectable: false,
            position: { x: 350 * ind, y: 5 },
            data: {
                table: {
                    name: node.name,
                    columns: node.columns,
                },
                states: {
                    isActive: false,
                    isFaded: false,
                },
            },
        };
    });
};

export const generateEdgeDataForCanvas = (
    edges: Array<TGeneratedEdgeData>,
    nodes: Array<TGeneratedNodeData>,
) => {
    return edges.map((edge) => {
        const TargetNode = nodes.find(
            (node) => node.name === edge.referencingTable,
        );
        const SourceNode = nodes.find(
            (node) => node.name === edge.referencedTable,
        );

        return {
            id: edge.id ?? '',
            source: SourceNode?.id ?? '',
            target: TargetNode?.id ?? '',
            data: edge.data,
        };
    });
};
