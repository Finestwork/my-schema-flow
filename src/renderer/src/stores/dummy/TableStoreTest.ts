import EdgesDummy from '@renderer/stores/dummy/EdgesDummy';
import TableDummy from '@renderer/stores/dummy/TableDummy';
import { TEdgeData } from '@renderer/stores/TableStore';
import { Edge } from '@vue-flow/core';
import { v4 as uuidv4 } from 'uuid';

const createElements = () => {
    const Elements: unknown[] = [];
    let index = 1;
    for (const table in TableDummy) {
        Elements.push({
            id: TableDummy[table].id,
            type: 'custom',
            connectable: false,
            position: { x: 270 * index, y: 5 },
            data: {
                table: {
                    name: TableDummy[table].name,
                    columns: TableDummy[table].columns,
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
            source: TableDummy[edge.source.table].id,
            target: TableDummy[edge.target.table].id,
            data: {
                referenced: {
                    id: TableDummy[edge.source.table].id,
                    column: edge.source.column,
                    table: edge.source.table,
                },
                referencing: {
                    id: TableDummy[edge.target.table].id,
                    column: edge.target.column,
                    table: edge.target.table,
                },
            },
        };

        Edges.push(EdgeObj);
    });

    return Edges;
};
export const TestElements = createElements();

export const TestEdges = createEdges();
