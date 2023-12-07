import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        isDarkMode: true,
        runAutoLayout: false,
        hideTableSettingsPanel: false,
        hideTableRelationSettingsPanel: false,
    }),
});
