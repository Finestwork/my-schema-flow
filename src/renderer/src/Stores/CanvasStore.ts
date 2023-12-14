import { defineStore } from 'pinia';
import type { GraphNode } from '@vue-flow/core';

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

export const useCanvasStore = defineStore('canvas', {
    state: () => ({
        currentActiveNode: {} as GraphNode & { data: TNodeData },
    }),
});
