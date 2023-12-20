import { defineStore } from 'pinia';
import { klona } from 'klona/full';
import type { TNode, TEdge } from '@stores/CanvasStore';

export type TItem = {
    label: string;
    payload: {
        nodes: Array<TNode>;
        edges: Array<TEdge>;
        currentActiveNode: TNode | Record<string, never>;
    };
};

export type TAddOptions = {
    shouldIncrement?: boolean;
};
export const useHistoryStore = defineStore('history', {
    state: () => ({
        currentIndex: 0,
        items: [] as Array<TItem>,

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
                label: item.label,
                payload: {
                    nodes: klona(item.payload.nodes),
                    edges: klona(item.payload.edges),
                    currentActiveNode: klona(item.payload.currentActiveNode),
                },
            });
            if (this.items.length > 1) {
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
            return state.items.map((item) => item.label);
        },
    },
});
