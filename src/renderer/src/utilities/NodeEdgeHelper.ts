import { v4 as uuidv4 } from 'uuid';
import type { TEdge, TNode } from '@stores/Canvas';

export const createNodes = (NodeDummy): Array<TNode> => {
    const Elements: Array<TNode> = [];
    let index = 1;
    for (const table in NodeDummy) {
        const NewObject = {
            id: NodeDummy[table].id,
            type: 'custom',
            connectable: false,
            position: { x: 270 * index, y: 5 },
            data: {
                table: {
                    name: NodeDummy[table].name,
                    columns: NodeDummy[table].columns,
                },
                states: {
                    isActive: false,
                    isFaded: false,
                },
            },
        };
        Elements.push(NewObject as TNode);
        index++;
    }
    return Elements;
};

export const createEdges = (edges, nodes) => {
    const Edges: Array<TEdge> = [];
    edges.forEach((edge) => {
        // set key constraint for the source
        const foreignKey = nodes[edge.source.table].columns.find(
            (column) => column.name === edge.source.column,
        );
        foreignKey.keyConstraint = 'FK';
        const EdgeObj = {
            id: uuidv4(),
            source: nodes[edge.source.table].id,
            target: nodes[edge.target.table].id,
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

        Edges.push(EdgeObj as TEdge);
    });
    return Edges;
};
