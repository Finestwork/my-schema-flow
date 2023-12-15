import { defineStore } from 'pinia';
import type { GraphNode } from '@vue-flow/core';
import { sortConstraintKeys } from '@utilities/TableHelper';

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
        sortActiveNodeColumns() {
            const Columns = this.currentActiveNode.data.table.columns;
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
