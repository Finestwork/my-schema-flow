import { useSettingsStore } from '@stores/SettingsStore';
import { useVueFlow } from '@vue-flow/core';

export function useCanvasViewport() {
    const settingsStore = useSettingsStore();
    const { toObject, onViewportChangeEnd } = useVueFlow();

    onViewportChangeEnd(() => {
        const CurrentInstance = toObject();
        settingsStore.zoomLevel = +CurrentInstance.viewport.zoom.toFixed(1);
    });
}
