import { v4 as uuidv4 } from 'uuid';
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
        const TargetNodeIndex = nodes.findIndex(
            (node) => node.name === edge.target.table,
        );
        const SourceNodeIndex = nodes.findIndex(
            (node) => node.name === edge.source.table,
        );
        const SourceNode = nodes[SourceNodeIndex];
        const SourceForeignColumn = SourceNode.columns.find(
            (column) => column.name === edge.source.column,
        );

        if (SourceForeignColumn) {
            SourceForeignColumn.keyConstraint = 'FK';
        }

        return {
            id: uuidv4(),
            source: SourceNode.id,
            target: nodes[TargetNodeIndex].id,
            data: {
                referenced: {
                    column: edge.source.column,
                },
                referencing: {
                    column: edge.target.column,
                },
                constraint: {
                    onDelete: edge.constraints.onDelete,
                    onUpdate: edge.constraints.onUpdate,
                },
            },
        };
    });
};
