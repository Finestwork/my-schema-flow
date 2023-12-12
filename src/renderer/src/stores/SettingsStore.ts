import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        file: {
            path: '',
            name: '',
        },
        isDarkMode: true,
        currentNodeOrientation: 'TB',
        hideTableSettingsPanel: false,
        hideTableRelationSettingsPanel: false,
        zoomLevel: 0.5,
    }),
});
