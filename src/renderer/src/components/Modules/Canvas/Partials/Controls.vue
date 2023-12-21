<script setup lang="ts">
import VCanvasControlButtonIcon from '@components/Base/ButtonIcons/VCanvasControlButtonIcon.vue';
import LockIcon from '@components/Shared/Icons/LockIcon.vue';
import UnlockIcon from '@components/Shared/Icons/UnlockIcon.vue';
import ZoomInIcon from '@components/Shared/Icons/ZoomInIcon.vue';
import ZoomOutIcon from '@components/Shared/Icons/ZoomOutIcon.vue';
import FullscreenIcon from '@components/Shared/Icons/FullscreenIcon.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { Controls } from '@vue-flow/controls';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

const settingsStore = useSettingsStore();
const isInteractive = ref(true);
const { zoomTo, fitView, toObject, setInteractive } = useVueFlow();
const onClickZoomIn = () => {
    if (settingsStore.zoomLevel >= 1) return;
    settingsStore.zoomLevel = +(settingsStore.zoomLevel + 0.1).toFixed(2);
    zoomTo(settingsStore.zoomLevel, { duration: 350 });
};
const onClickZoomOut = () => {
    if (settingsStore.zoomLevel <= 0.1) return;
    settingsStore.zoomLevel = +(settingsStore.zoomLevel - 0.1).toFixed(2);
    zoomTo(settingsStore.zoomLevel, { duration: 350 });
};
const onClickFitView = () => {
    fitView();
    setTimeout(() => {
        const { viewport } = toObject();
        settingsStore.zoomLevel = +viewport.zoom.toFixed(1);
    }, 150);
};
const onClickControlInteractive = () => {
    setInteractive(!isInteractive.value);
    isInteractive.value = !isInteractive.value;
};
</script>

<template>
    <Controls>
        <template #control-zoom-in>
            <VCanvasControlButtonIcon
                :disabled="settingsStore.zoomLevel >= 1"
                @click="onClickZoomIn"
            >
                <ZoomInIcon />
                <template #tooltip>Zoom In</template>
            </VCanvasControlButtonIcon>
        </template>
        <template #control-zoom-out>
            <VCanvasControlButtonIcon
                :disabled="settingsStore.zoomLevel <= 0.1"
                @click="onClickZoomOut"
            >
                <ZoomOutIcon />
                <template #tooltip>Zoom Out</template>
            </VCanvasControlButtonIcon>
        </template>
        <template #control-fit-view>
            <VCanvasControlButtonIcon @click="onClickFitView">
                <FullscreenIcon />
                <template #tooltip>Fit to View</template>
            </VCanvasControlButtonIcon>
        </template>
        <template #control-interactive>
            <VCanvasControlButtonIcon @click="onClickControlInteractive">
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
