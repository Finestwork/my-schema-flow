import { defineStore } from 'pinia';

export const useFileStore = defineStore('file', {
    state: () => {
        return {
            fileName: '' as string,
            filePath: '' as string,
            canvasElements: '' as string,
        };
    },
});
