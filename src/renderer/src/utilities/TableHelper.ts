import { mySqlDataTypes } from '@utilities/DatabaseHelper';
import { findNode } from '@utilities/CanvasHelper';
import numeral from 'numeral';
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
        const Size = numeral(column.length).format('0a');
        const Type = column.type;
        const MySqlDataType = mySqlDataTypes.filter(
            (dataType) => dataType.name === Type,
        )[0];
        let formattedType = '';

        if (MySqlDataType && MySqlDataType.hasSize && Size !== '0') {
            formattedType = `${Type}(${Size})`;
        } else {
            formattedType = `${Type}`;
        }

        return {
            name: column.name,
            type: formattedType,
            keyConstraint: column.keyConstraint,
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
