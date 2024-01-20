<script setup lang="ts">
import VCanvasControlButtonIcon from '@components/Base/ButtonIcons/VCanvasControlButtonIcon.vue';
import LockIcon from '@components/Shared/Icons/LockIcon.vue';
import UnlockIcon from '@components/Shared/Icons/UnlockIcon.vue';
import ZoomInIcon from '@components/Shared/Icons/ZoomInIcon.vue';
import ZoomOutIcon from '@components/Shared/Icons/ZoomOutIcon.vue';
import FullscreenIcon from '@components/Shared/Icons/FullscreenIcon.vue';
import { useCanvasControls } from '@composables/Canvas/useCanvasControls';
import { Controls } from '@vue-flow/controls';

const {
    zoomLevel,
    isInteractive,
    zoomIn,
    zoomOut,
    runFitView,
    toggleInteractive,
} = useCanvasControls();
let zoomInInterval = 0;
let zoomOutInterval = 0;

const onMouseDownZoomIn = () => {
    zoomIn();
    if (zoomInInterval !== 0) return;
    zoomInInterval = window.setInterval(() => {
        if (zoomLevel.value >= 1) {
            window.clearInterval(zoomInInterval);
            zoomInInterval = 0;
        }
        zoomIn();
    }, 150);
};
const onMouseUpStopZoomIn = () => {
    window.clearInterval(zoomInInterval);
    zoomInInterval = 0;
};
const onMouseDownZoomOut = () => {
    zoomOut();
    zoomOutInterval = window.setInterval(() => {
        if (zoomLevel.value <= 0.1) {
            window.clearInterval(zoomOutInterval);
            zoomOutInterval = 0;
        }
        zoomOut();
    }, 150);
};
const onMouseUpStopZoomOut = () => {
    window.clearInterval(zoomOutInterval);
    zoomOutInterval = 0;
};
</script>

<template>
    <Controls>
        <template #control-zoom-in>
            <VCanvasControlButtonIcon
                :disabled="zoomLevel >= 1"
                @mousedown="onMouseDownZoomIn"
                @mouseup="onMouseUpStopZoomIn"
            >
                <ZoomInIcon />
                <template #tooltip>Zoom In</template>
            </VCanvasControlButtonIcon>
        </template>
        <template #control-zoom-out>
            <VCanvasControlButtonIcon
                :disabled="zoomLevel <= 0.1"
                @mousedown="onMouseDownZoomOut"
                @mouseup="onMouseUpStopZoomOut"
            >
                <ZoomOutIcon />
                <template #tooltip>Zoom Out</template>
            </VCanvasControlButtonIcon>
        </template>
        <template #control-fit-view>
            <VCanvasControlButtonIcon @click="runFitView">
                <FullscreenIcon />
                <template #tooltip>Fit to View</template>
            </VCanvasControlButtonIcon>
        </template>
        <template #control-interactive>
            <VCanvasControlButtonIcon @click="toggleInteractive">
                <UnlockIcon v-if="isInteractive" />
                <LockIcon v-else />

                <template #tooltip>
                    {{
                        !isInteractive
                            ? 'Unlock Interactivity'
                            : 'Lock Interactivity'
                    }}
                </template>
            </VCanvasControlButtonIcon>
        </template>
    </Controls>
</template>
