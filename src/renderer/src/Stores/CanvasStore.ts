import { defineStore } from 'pinia';
import type { GraphNode } from '@vue-flow/core';
import { sortConstraintKeys } from '@utilities/TableHelper';
import { klona } from 'klona';

export type TTableColumn = {
    id: number;
    name: string;
    type: string;
    isNull: boolean;
    length: '';
    keyConstraint: 'PK' | 'FK' | '';
};
export type TNodeData = {
    table: {
        name: string;
        columns: TTableColumn[];
    };
    state: {
        isActive: boolean;
    };
    style: {
        opacity: number;
    };
};

export type TNode = GraphNode & { data: TNodeData };

export const useCanvasStore = defineStore('canvas', {
    state: () => ({
        currentActiveNode: {} as TNode,
    }),
    actions: {
        removeNodeActiveState() {
            if (Object.keys(this.currentActiveNode).length !== 0) {
                this.currentActiveNode.data.state.isActive = false;
            }
            this.currentActiveNode = Object.assign({}, {}); // To make it reactive
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
    },
    getters: {
        hasActiveNode: (state) => {
            return Object.keys(state.currentActiveNode).length !== 0;
        },
    },
});
