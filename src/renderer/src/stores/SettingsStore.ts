import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        isDarkMode: true,
        hideTableSettingsPanel: false,
        hideTableRelationSettingsPanel: false,
    }),
});
