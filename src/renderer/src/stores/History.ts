import { defineStore } from 'pinia';
import { klona } from 'klona/full';
import type { TNode, TEdge } from '@stores/Canvas';

export type TItem = {
    label: string;
    payload: {
        nodes: Array<TNode>;
        edges: Array<TEdge>;
    };
};

export type TAddOptions = {
    shouldIncrement?: boolean;
};
export const useHistoryStore = defineStore('history', {
    state: () => ({
        currentIndex: 0,
        items: [] as Array<TItem>,
        currentValue: null as TItem | null,
    }),
    actions: {
        addItem(item: TItem) {
            // Since the current index is not the same with the current item, we should remove all items after it
            // So we can have new history items
            const ShouldRemoveItems =
                this.items.length - 1 !== -1 &&
                this.currentIndex !== this.items.length - 1;
            if (ShouldRemoveItems) {
                this.items = this.items.splice(0, this.currentIndex + 1);
            }

            this.items.push({
                label: item.label,
                payload: {
                    nodes: klona(item.payload.nodes),
                    edges: klona(item.payload.edges),
                },
            });
            if (this.items.length > 1) {
                this.currentIndex = this.items.length - 1;
            }
        },
        jump(index: number) {
            this.currentIndex = index;
            this.currentValue = this.items[index];
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
