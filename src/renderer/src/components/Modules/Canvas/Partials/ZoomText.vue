<script setup lang="ts">
import { useSettingsStore } from '@stores/Settings';

const settingsStore = useSettingsStore();
</script>

<template>
    <span
        class="absolute left-2 top-2 z-50 text-xs font-semibold text-slate-900 dark:text-slate-300"
        >{{ settingsStore.getZoomLevelInPercentage }}%</span
    >
</template>
