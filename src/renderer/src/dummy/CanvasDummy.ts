import NodeDummy from '@dummy/NodeDummy';
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

    return Edges;
};
export const TestNodes = createNodes();

export const TestEdges = createEdges();
