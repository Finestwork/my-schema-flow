import { defineStore } from 'pinia';
import { klona } from 'klona/full';
import type { TEdge, TElement } from '@stores/TableStore';

export type TItem = {
    description: string;
    payload: {
        nodes: TElement[];
        edges: TEdge[];
    };
};

export type TAddOptions = {
    shouldIncrement?: boolean;
};
export const useHistoryStore = defineStore('historyState', {
    state: () => ({
        currentIndex: 0,
        items: [] as TItem[],
        currentValue: null,
        runUndo: false,
        runRedo: false,
    }),
    actions: {
        addItem(item: TItem, options: TAddOptions = {}) {
            const DefaultOptions = Object.assign(
                {
                    shouldIncrement: true,
                },
                options,
            );

            this.items.push({
                description: item.description,
                payload: {
                    nodes: klona(item.payload.nodes),
                    edges: klona(item.payload.edges),
                },
            });

            if (DefaultOptions.shouldIncrement) {
                this.currentIndex++;
            }
        },
        redo() {
            if (this.currentIndex === this.items.length - 1) return; // Point is at the last item
            this.currentIndex++;
            this.currentValue = this.items[this.currentIndex];
        },
        undo() {
            if (this.currentIndex < 0) return; // Point is at the first item
            this.currentIndex--;
            this.currentValue = this.items[this.currentIndex];
        },
    },
    getters: {
        canUndo: (state) => state.currentIndex > 0,
        canRedo: (state) => state.currentIndex !== state.items.length - 1,
    },
});
