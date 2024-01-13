import { findNode } from '@utilities/CanvasHelper';
import { klona } from 'klona/json';
import type { TEdge, TNode, TTableColumn } from '@stores/Canvas';

/**
 * Sorts table column from pk to fk
 */
export const sortConstraintKeys = (arr: Array<TTableColumn>) => {
    return arr.slice().sort((a, b) => {
        if (a.keyConstraint === 'PK' && b.keyConstraint !== 'PK') {
            return -1;
        }
        if (a.keyConstraint !== 'PK' && b.keyConstraint === 'PK') {
            return 1;
        }
        if (a.keyConstraint === 'FK' && b.keyConstraint !== 'FK') {
            return -1;
        }
        if (a.keyConstraint !== 'FK' && b.keyConstraint === 'FK') {
            return 1;
        }
        return 0;
    });
};

/**
 * Reformat the column array to make it compatible with the node canvas for display
 */
export const formatColumnForNodeCanvas = (arr: Array<TTableColumn>) => {
    return arr.map((column) => {
        return {
            name: column.name,
            type: column.type,
            keyConstraint: column.keyConstraint,
            shouldHighlight: column.shouldHighlight,
        };
    });
};

export const getRelationList = (
    currentActiveEdges: Array<TEdge>,
    nodes: Array<TNode>,
    activeNodeId: string,
) => {
    return klona(currentActiveEdges)
        .map((edge) => {
            const SourceNode = findNode(edge.source, nodes);
            const TargetNode = findNode(edge.target, nodes);
            const IsParent = edge.target === activeNodeId;

            if (!TargetNode || !SourceNode) {
                return {
                    id: '',
                    table: '',
                    column: '',
                    relation: '',
                    isCurrentNodeParent: false,
                };
            }

            const Table = IsParent
                ? SourceNode.data.table.name
                : TargetNode.data.table.name;
            const Column = IsParent
                ? edge.data.referenced.column
                : edge.data.referencing.column;
            return {
                id: edge.id,
                table: Table,
                column: Column,
                relation: IsParent ? 'Parent' : 'Child',
                isCurrentNodeParent: IsParent,
            };
        })
        .sort((edge) => {
            return edge.isCurrentNodeParent ? 1 : -1;
        });
};

/**
 * This makes sure the column data type is in the uppercase format
 */
export const formatColumnDataType = (column: string) => {
    const SplittedColumn = column.split('(');
    const Type = SplittedColumn[0];
    return `${Type.toUpperCase()}(${SplittedColumn[1]}`;
};

/**
 * Extracts the table name and all the columns
 */
export const extractTableData = (nodes: Array<TNode>) => {
    const Tables = nodes.map((node) => node.data.table.name);
    const Columns = nodes
        .map((node) => node.data.table.columns)
        .map((columns) =>
            columns.map((column) => ({
                name: column.name,
                type: column.type,
            })),
        )
        .flat();

    return {
        tables: Tables,
        columns: Columns,
    };
};
