<script setup lang="ts">
import VTitleBarButtonIcon from '@components/Base/Buttons/VTitleBarButtonIcon.vue';
import SettingsIcon from '@components/Shared/Icons/SettingsIcon.vue';
import { useSettingsStore } from '@stores/Settings';

const settingsStore = useSettingsStore();
</script>

<template>
    <VTitleBarButtonIcon
        :windows="['Ctrl', 'Alt', 'S']"
        :mac-os="['⌘', 'Alt', 'S']"
        :is-active="settingsStore.showSettings"
        @click="settingsStore.showSettings = !settingsStore.showSettings"
    >
        <SettingsIcon />

        <template #tooltipLabel>Settings</template>
    </VTitleBarButtonIcon>
</template>
