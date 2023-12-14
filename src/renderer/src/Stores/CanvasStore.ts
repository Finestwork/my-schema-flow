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
    },
});
