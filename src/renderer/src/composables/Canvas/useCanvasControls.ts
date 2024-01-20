import { useSettingsStore } from '@stores/Settings';
import { ref } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import { storeToRefs } from 'pinia';

export function useCanvasControls() {
    const { zoomLevel } = storeToRefs(useSettingsStore());
    const isInteractive = ref(true);

    const { zoomTo, fitView, toObject, setInteractive } = useVueFlow();
    const zoomOut = (zoom?: number) => {
        if (zoomLevel.value <= 0.1) return;
        if (zoom) {
            zoomLevel.value = zoom;
        } else {
            zoomLevel.value = +(zoomLevel.value - 0.1).toFixed(2);
        }

        zoomTo(zoomLevel.value, { duration: 350 });
    };

    const zoomIn = () => {
        if (zoomLevel.value === 1) return;
        zoomLevel.value = +(zoomLevel.value + 0.1).toFixed(2);
        zoomTo(zoomLevel.value, { duration: 350 });
    };

    const runFitView = () => {
        fitView();
        setTimeout(() => {
            const { viewport } = toObject();
            zoomLevel.value = +viewport.zoom.toFixed(1);
        }, 150);
    };
    const toggleInteractive = () => {
        setInteractive(!isInteractive.value);
        isInteractive.value = !isInteractive.value;
    };

    return {
        zoomLevel,
        isInteractive,
        zoomIn,
        zoomOut,
        runFitView,
        toggleInteractive,
    };
}
