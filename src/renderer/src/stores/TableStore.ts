import { defineStore } from 'pinia';
import { TestElements, TestEdges } from '@stores/TableStoreTest';
import type { Edge, Node } from '@vue-flow/core';

export type TTableColumn = {
    name: string;
    type: string;
    isNull: boolean;
    length: number | null;
    keyConstraint: 'PK' | 'FK' | null;
};

export type TTableData = {
    table: {
        name: string;
        columns: TTableColumn[];
    };
};

export const useTableStore = defineStore('tableStore', {
    state() {
        return {
            elements: TestElements as Node & { data: TTableData }[],
            edges: TestEdges as Edge[],
            currentActiveNode: {} as (Node & { data: TTableData }[]) | Record<string, never>,
        };
    },
    getters: {
        hasActiveNode(state) {
            return Object.keys(state.currentActiveNode).length !== 0;
        },
        activeNodeHasColumns(state) {
            if (!state.hasActiveNode) {
                return false;
            }

            const Columns = state.currentActiveNode.data.table.columns;
            return Columns.length !== 0;
        },
    },
});
