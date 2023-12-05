<script setup lang="ts">
import CanvasButtonControl from '@components/CanvasButtonControl.vue';
import IconFullScreen from '@components/IconFullScreen.vue';
import IconLock from '@components/IconLock.vue';
import IconUnlock from '@components/IconUnlock.vue';
import IconZoomIn from '@components/IconZoomIn.vue';
import IconZoomOut from '@components/IconZoomOut.vue';
import { Controls } from '@vue-flow/controls';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

const currentZoom = ref(0.5);
const isInteractive = ref(true);
const { zoomIn, zoomOut, fitView, setInteractive, getViewport } = useVueFlow();
const onClickZoomIn = () => {
    currentZoom.value = getViewport().zoom;
    zoomIn({ duration: 350 });
};
const onClickZoomOut = () => {
    currentZoom.value = getViewport().zoom;
    zoomOut({ duration: 350 });
};
const onClickControlInteractive = () => {
    setInteractive(!isInteractive.value);
    isInteractive.value = !isInteractive.value;
};
</script>
<template>
    <Controls>
        <template #control-zoom-in>
            <CanvasButtonControl :disabled="currentZoom === 1.5" @click="onClickZoomIn">
                <IconZoomIn />
                <template #tooltip>Zoom In</template>
            </CanvasButtonControl>
        </template>
        <template #control-zoom-out>
            <CanvasButtonControl :disabled="currentZoom === 0.5" @click="onClickZoomOut">
                <IconZoomOut />
                <template #tooltip>Zoom Out</template>
            </CanvasButtonControl>
        </template>
        <template #control-fit-view>
            <CanvasButtonControl @click="fitView()">
                <IconFullScreen />
                <template #tooltip>Fit to View</template>
            </CanvasButtonControl>
        </template>
        <template #control-interactive>
            <CanvasButtonControl @click="onClickControlInteractive">
                <IconUnlock v-if="isInteractive" />
                <IconLock v-else />

                <template #tooltip>
                    {{ !isInteractive ? 'Unlock Interactivity' : 'Lock Interactivity' }}
                </template>
            </CanvasButtonControl>
        </template>
    </Controls>
</template>
