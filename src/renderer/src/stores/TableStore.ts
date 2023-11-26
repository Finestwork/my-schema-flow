import { defineStore } from 'pinia';
import { TestElements, TestEdges } from '@stores/TableStore.test';
import type { Edge, Node } from '@vue-flow/core';

export type TTableData = {
    table: {
        name: string;
    };
};

export const useTableStore = defineStore('tableStore', {
    state: () => ({
        elements: TestElements as Node & { data: TTableData }[],
        edges: TestEdges as Edge[],
        currentActiveNode: null as Node | null,
    }),
});
