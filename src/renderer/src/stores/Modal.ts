import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
    state: () => ({
        showDiagramLoaderModal: false,
        showPlaygroundModal: false,
    }),
});
