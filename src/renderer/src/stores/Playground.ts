import { defineStore } from 'pinia';
export const usePlaygroundStore = defineStore('playground', {
    state: () => ({
        SQLScript: '',
        db: null,
        tables: [],
        currentTable: '',
        result: [],
    }),
});
