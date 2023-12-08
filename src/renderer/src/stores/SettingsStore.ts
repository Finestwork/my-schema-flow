import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        isDarkMode: true,
        currentNodeOrientation: 'TB',
        hideTableSettingsPanel: false,
        hideTableRelationSettingsPanel: false,
    }),
});
