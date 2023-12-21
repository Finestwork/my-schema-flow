import EdgesDummy from '@dummy/EdgesDummy';
import NodeDummy from '@dummy/NodeDummy';
import { Edge } from '@vue-flow/core';
import { v4 as uuidv4 } from 'uuid';
import type { TEdgeData } from '@stores/Canvas';
import type { GraphNode } from '@vue-flow/core';

const createNodes = (): GraphNode[] => {
    const Elements: unknown[] = [];
    let index = 1;
    for (const table in NodeDummy) {
        Elements.push({
            id: NodeDummy[table].id,
            type: 'custom',
            connectable: false,
            position: { x: 270 * index, y: 5 },
            data: {
                table: {
                    name: NodeDummy[table].name,
                    columns: NodeDummy[table].columns,
                },
                state: {
                    isActive: false,
                },
                style: {
                    opacity: 1,
                },
            },
        });
        index++;
    }
    return Elements;
};

const createEdges = () => {
    const Edges: (Edge & { data: TEdgeData })[] = [];
    EdgesDummy.forEach((edge) => {
        const EdgeObj = {
            id: uuidv4(),
            source: NodeDummy[edge.source.table].id,
            target: NodeDummy[edge.target.table].id,
            data: {
                referenced: {
                    column: edge.source.column,
                },
                referencing: {
                    column: edge.target.column,
                },
            },
        };

        Edges.push(EdgeObj);
    });

    return Edges;
};
export const TestNodes = createNodes();

export const TestEdges = createEdges();
