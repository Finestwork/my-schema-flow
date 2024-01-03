import { defineStore } from 'pinia';
import type { BackgroundVariant } from '@vue-flow/background';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        showSettings: false,
        isDarkMode: false,
        viewJumpAnimation: true,
        zoomLevel: 0.5,
        currentOrientation: 'TB',
        backgroundVariant: 'dots' as BackgroundVariant,
    }),
    getters: {
        getZoomLevelInPercentage(state) {
            return state.zoomLevel * 100;
        },
    },
});
