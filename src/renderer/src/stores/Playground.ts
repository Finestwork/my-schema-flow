import { defineStore } from 'pinia';

export type TConnection = {
    database: string;
    host: string;
    port: string;
    user: string;
    password: string;
};
export const usePlaygroundStore = defineStore('playground', {
    state: () => ({
        connection: null as TConnection | null,
    }),
});
