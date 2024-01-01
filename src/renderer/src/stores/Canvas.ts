import { sortConstraintKeys } from '@utilities/TableHelper';
import { defineStore } from 'pinia';
import { klona } from 'klona';
import type { GraphNode, GraphEdge } from '@vue-flow/core';

export type TTableColumn = {
    id: number;
    name: string;
    type: string;
    isNull: boolean;
    length: string;
    keyConstraint: 'PK' | 'FK' | string;
    shouldHighlight: boolean;
};
export type TNodeData = {
    table: {
        name: string;
        columns: TTableColumn[];
    };
    states: {
        isActive: boolean;
        isFaded: boolean;
    };
};

export type TEdgeData = {
    connection: {
        source: {
            position: 'top' | 'right' | 'bottom' | 'left';
            nodeId: string;
        };
        target: {
            position: 'top' | 'right' | 'bottom' | 'left';
            nodeId: string;
        };
    };
    referenced: {
        column: string;
    };
    referencing: {
        column: string;
    };
    constraint: {
        onDelete:
            | 'CASCADE'
            | 'SET NULL'
            | 'RESTRICT'
            | 'NO ACTION'
            | 'SET DEFAULT'
            | string;
        onUpdate:
            | 'CASCADE'
            | 'SET NULL'
            | 'RESTRICT'
            | 'NO ACTION'
            | 'SET DEFAULT'
            | string;
    };
};

export type TNode = GraphNode & { data: TNodeData };
export type TEdge = GraphEdge & { data: TEdgeData };

export type TConnectionPositions = {
    top: Array<string>;
    right: Array<string>;
    bottom: Array<string>;
    left: Array<string>;
};
export type TConnectionData = {
    [k: string]: {
        source: TConnectionPositions;
        target: TConnectionPositions;
    };
};
export const useCanvasStore = defineStore('canvas', {
    state: () => ({
        currentActiveNode: {} as TNode | Record<string, never>,
        currentActiveEdge: {} as TEdge | Record<string, never>,
        connections: {} as TConnectionData | Record<string, never>,
        currentNodeActiveColumnIndex: -1,
    }),
    actions: {
        addColumnInActiveNode(
            data: Omit<TTableColumn, 'id' | 'shouldHighlight'>,
        ) {
            const Columns = this.currentActiveNode.data.table.columns;
            const AddedObject = Object.assign(
                { shouldHighlight: false },
                klona(data),
            );
            Columns.push(AddedObject);
            this.currentActiveNode.data.table.columns =
                sortConstraintKeys(Columns);
        },
        updateColumnInActiveNode(
            data: Omit<
                TTableColumn,
                'id' | 'keyConstraint' | 'shouldHighlight'
            >,
            index: number,
        ) {
            const Columns = this.currentActiveNode.data.table.columns;
            Columns[index] = Object.assign(Columns[index], klona(data));
            this.currentActiveNode.data.table.columns =
                sortConstraintKeys(Columns);
        },
        cloneColumnInActiveNode(cloneIndex: number) {
            const CurrentActiveNode = this.currentActiveNode;
            const Columns = CurrentActiveNode.data.table.columns;
            const CopiedColumn = klona(Columns[cloneIndex]);
            CopiedColumn.name = CopiedColumn.name.replace(/\(\d+\)/, '');
            const count = Columns.filter((column) =>
                column.name.includes(CopiedColumn.name),
            ).length;

            CopiedColumn.name = `${CopiedColumn.name}(${count})`;
            // If a column is a primary key, do not copy it; there should only be one primary key
            if (CopiedColumn.keyConstraint === 'PK') {
                return;
            }
            Columns.push(CopiedColumn);
            this.currentActiveNode.data.table.columns =
                sortConstraintKeys(Columns);
            return CopiedColumn;
        },
        removeColumnInActiveNode(removeIndex: number) {
            const CurrentActiveNode = this.currentActiveNode;
            const Columns = CurrentActiveNode.data.table.columns;
            return Columns.splice(removeIndex, 1)[0];
        },
    },
    getters: {
        hasActiveNode: (state) => {
            return Object.keys(state.currentActiveNode).length !== 0;
        },
        hasActiveEdge: (state) => {
            return Object.keys(state.currentActiveEdge).length !== 0;
        },
        isActiveNodeParent(state) {
            if (Object.keys(state.currentActiveEdge).length === 0) return false;
            return (
                state.currentActiveEdge.sourceNode.id ===
                state.currentActiveNode.id
            );
        },
        displayColumnsOfActiveNode(state) {
            return state.currentActiveNode.data.table.columns.map((column) => ({
                name: column.name,
                type: column.type,
                keyConstraint: column.keyConstraint,
                shouldHighlight: column.shouldHighlight,
            }));
        },
        getCurrentActiveColumnData(state) {
            if (!this.hasActiveNode) return {};
            return state.currentActiveNode.data.table.columns[
                state.currentNodeActiveColumnIndex
            ];
        },
    },
});
