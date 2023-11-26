import { defineStore } from 'pinia';
import { TestElements, TestEdges } from '@stores/TableStoreTest';
import type { Edge, Node } from '@vue-flow/core';

export type TTableData = {
    table: {
        name: string;
    };
};

export const useTableStore = defineStore('tableStore', {
    state() {
        return {
            elements: TestElements as Node & { data: TTableData }[],
            edges: TestEdges as Edge[],
            currentActiveNode: {} as Node | Record<string, never>,
        };
    },
    getters: {
        hasActiveNode(state) {
            return Object.keys(state.currentActiveNode).length !== 0;
        },
    },
});
