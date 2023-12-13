<script setup lang="ts">
import BaseButtonControl from '@components/Canvas/Partials/BaseButtonControl.vue';
import VFullScreenIcon from '@components/Shared/Icons/VFullScreenIcon.vue';
import VLockIcon from '@components/Shared/Icons/VLockIcon.vue';
import VUnlockIcon from '@components/Shared/Icons/VUnlockIcon.vue';
import VZoomInIcon from '@components/Shared/Icons/VZoomInIcon.vue';
import VZoomOutIcon from '@components/Shared/Icons/VZoomOutIcon.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { Controls } from '@vue-flow/controls';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

const settingsStore = useSettingsStore();
const isInteractive = ref(true);
const { zoomTo, fitView, setInteractive } = useVueFlow();
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
const onClickControlInteractive = () => {
    setInteractive(!isInteractive.value);
    isInteractive.value = !isInteractive.value;
};
</script>
<template>
    <Controls>
        <template #control-zoom-in>
            <BaseButtonControl
                :disabled="settingsStore.zoomLevel >= 1"
                @click="onClickZoomIn"
            >
                <VZoomInIcon />
                <template #tooltip>Zoom In</template>
            </BaseButtonControl>
        </template>
        <template #control-zoom-out>
            <BaseButtonControl
                :disabled="settingsStore.zoomLevel <= 0.1"
                @click="onClickZoomOut"
            >
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
                    {{
                        !isInteractive
                            ? 'Unlock Interactivity'
                            : 'Lock Interactivity'
                    }}
                </template>
            </BaseButtonControl>
        </template>
    </Controls>
</template>
