import { defineStore } from 'pinia';
import { klona } from 'klona/full';
import type { TEdge, TElement } from '@stores/TableStore';

export type TItem = {
    description: string;
    payload: {
        nodes: TElement[];
        edges: TEdge[];
        currentActiveNode: TElement | Record<string, never>;
        currentActiveEdges: TEdge[];
        currentActiveEdgeIndex: number;
    };
};

export type TAddOptions = {
    shouldIncrement?: boolean;
};
export const useHistoryStore = defineStore('history', {
    state: () => ({
        currentIndex: 0,
        items: [] as TItem[],

        // need to set manually, so it will not automatically trigger components that watch this property
        currentValue: null,
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
                    currentActiveNode: klona(item.payload.currentActiveNode),
                    currentActiveEdges: klona(item.payload.currentActiveEdges),
                    currentActiveEdgeIndex: item.payload.currentActiveEdgeIndex,
                },
            });

            if (DefaultOptions.shouldIncrement) {
                this.currentIndex = this.items.length - 1;
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
        getHistoryDisplay(state) {
            return state.items.map((item) => item.description);
        },
    },
});
