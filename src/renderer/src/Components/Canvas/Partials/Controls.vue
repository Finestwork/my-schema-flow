<script setup lang="ts">
import BaseButtonControl from '@components/Canvas/Partials/BaseButtonControl.vue';
import VFullScreenIcon from '@components/Shared/Icons/VFullScreenIcon.vue';
import VLockIcon from '@components/Shared/Icons/VLockIcon.vue';
import VUnlockIcon from '@components/Shared/Icons/VUnlockIcon.vue';
import VZoomInIcon from '@components/Shared/Icons/VZoomInIcon.vue';
import VZoomOutIcon from '@components/Shared/Icons/VZoomOutIcon.vue';
import { Controls } from '@vue-flow/controls';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

const { currentZoom } = defineModels<{
    currentZoom: number;
}>();
const isInteractive = ref(true);
const { zoomTo, fitView, setInteractive } = useVueFlow();
const onClickZoomIn = () => {
    if (currentZoom.value >= 1) return;
    currentZoom.value = +(currentZoom.value + 0.1).toFixed(2);
    zoomTo(currentZoom.value, { duration: 350 });
};
const onClickZoomOut = () => {
    if (currentZoom.value <= 0.1) return;
    currentZoom.value = +(currentZoom.value - 0.1).toFixed(2);
    zoomTo(currentZoom.value, { duration: 350 });
};
const onClickControlInteractive = () => {
    setInteractive(!isInteractive.value);
    isInteractive.value = !isInteractive.value;
};
</script>
<template>
    <Controls>
        <template #control-zoom-in>
            <BaseButtonControl :disabled="currentZoom >= 1" @click="onClickZoomIn">
                <VZoomInIcon />
                <template #tooltip>Zoom In</template>
            </BaseButtonControl>
        </template>
        <template #control-zoom-out>
            <BaseButtonControl :disabled="currentZoom <= 0.1" @click="onClickZoomOut">
                <VZoomOutIcon />
                <template #tooltip>Zoom Out</template>
            </BaseButtonControl>
        </template>
        <template #control-fit-view>
            <BaseButtonControl @click="fitView()">
                <VFullScreenIcon />
                <template #tooltip>Fit to View</template>
            </BaseButtonControl>
        </template>
        <template #control-interactive>
            <BaseButtonControl @click="onClickControlInteractive">
                <VUnlockIcon v-if="isInteractive" />
                <VLockIcon v-else />

                <template #tooltip>
                    {{ !isInteractive ? 'Unlock Interactivity' : 'Lock Interactivity' }}
                </template>
            </BaseButtonControl>
        </template>
    </Controls>
</template>
