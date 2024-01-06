import { defineStore } from 'pinia';

export const usePlaygroundStore = defineStore('modal', {
    state: () => ({
        SQLScript: '',
        db: null,
    }),
});
