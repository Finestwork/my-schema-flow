import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        isDarkMode: false,
        zoomLevel: 0.5,
        currentOrientation: 'TB',
    }),
    getters: {
        getZoomLevelInPercentage(state) {
            return state.zoomLevel * 100;
        },
    },
});
