import { sortConstraintKeys } from '@utilities/TableHelper';
import { defineStore } from 'pinia';
import { klona } from 'klona';
import type { GraphNode, GraphEdge } from '@vue-flow/core';

export type TTableColumn = {
    id: number;
    name: string;
    originalColumnName?: string;
    type: string;
    isNull: boolean;
    length: string;
    keyConstraint: 'PK' | 'FK' | string;
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
    referenced: {
        column: string;
    };
    referencing: {
        column: string;
    };
};

export type TNode = GraphNode & { data: TNodeData };
export type TEdge = GraphEdge & { data: TEdgeData };

export const useCanvasStore = defineStore('canvas', {
    state: () => ({
        currentActiveNode: {} as TNode,
        currentActiveEdge: {} as TEdge | Record<string, never>,
    }),
    actions: {
        addColumnInActiveNode(data: Omit<TTableColumn, 'id', 'keyConstraint'>) {
            const Columns = this.currentActiveNode.data.table.columns;
            Columns.push(klona(data));
            this.currentActiveNode.data.table.columns =
                sortConstraintKeys(Columns);
        },
        updateColumnInActiveNode(
            data: Omit<TTableColumn, 'id', 'keyConstraint'>,
            index: number,
        ) {
            const Columns = this.currentActiveNode.data.table.columns;
            Columns[index] = klona(data);
            this.currentActiveNode.data.table.columns =
                sortConstraintKeys(Columns);
        },
        cloneColumnInActiveNode(cloneIndex: number) {
            const CurrentActiveNode = this.currentActiveNode;
            const Columns = CurrentActiveNode.data.table.columns;
            const CopiedColumn = klona(Columns[cloneIndex]);

            // If a column is a primary key, do not copy it; there should only be one primary key
            if (CopiedColumn.keyConstraint === 'PK') {
                return;
            }
            Columns.push(CopiedColumn);
            this.currentActiveNode.data.table.columns =
                sortConstraintKeys(Columns);
        },
        removeColumnInActiveNode(removeIndex: number) {
            const CurrentActiveNode = this.currentActiveNode;
            const Columns = CurrentActiveNode.data.table.columns;
            Columns.splice(removeIndex, 1);
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
            if (!state.hasActiveEdge) return false;
            return (
                state.currentActiveEdge.sourceNode.id ===
                state.currentActiveNode.id
            );
        },
    },
});
