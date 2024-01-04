import NodeDummy from '@dummy/NodeDummy';
import EdgesDummy from '@dummy/EdgesDummy';
import { v4 as uuidv4 } from 'uuid';
import type { TEdge, TNode } from '@stores/Canvas';

const createNodes = (): Array<TNode> => {
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

const createEdges = () => {
    const Edges: Array<TEdge> = [];
    EdgesDummy.forEach((edge) => {
        const EdgeObj = {
            id: uuidv4(),
            source: NodeDummy[edge.source.table].id,
            target: NodeDummy[edge.target.table].id,
            style: {
                strokeWidth: 2.5,
            },
            data: {
                referenced: {
                    column: edge.source.column,
                    isHandleActive: false,
                },
                referencing: {
                    column: edge.target.column,
                    isHandleActive: false,
                },
                constraint: {
                    onDelete: 'NO ACTION',
                    onUpdate: 'NO ACTION',
                },
            },
        };

        Edges.push(EdgeObj as TEdge);
    });
    return Edges;
};
export const TestNodes = createNodes();

export const TestEdges = createEdges();
