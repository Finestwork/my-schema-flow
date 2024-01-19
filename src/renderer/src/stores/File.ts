import { defineStore } from 'pinia';

export const useFileStore = defineStore('file', {
    state: () => {
        return {
            fileName: '' as string,
            filePath: '' as string,
            savedIndex: -1 as number, // This tracks the current index of the saved history item.
        };
    },
    getters: {
        getFileNameWithoutExt(state) {
            if (state.fileName.trim() === '') return '';
            return state.fileName.split('.')[0];
        },
    },
});
