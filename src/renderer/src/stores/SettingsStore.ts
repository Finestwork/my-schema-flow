import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settingsStore', {
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
