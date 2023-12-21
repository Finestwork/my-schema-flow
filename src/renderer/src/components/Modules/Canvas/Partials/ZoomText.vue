<script setup lang="ts">
import { useSettingsStore } from '@stores/SettingsStore';

const settingsStore = useSettingsStore();
</script>

<template>
    <span
        class="absolute left-2 top-2 z-50 text-xs font-semibold dark:text-slate-300"
        >{{ settingsStore.getZoomLevelInPercentage }}%</span
    >
</template>
