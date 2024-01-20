<script setup lang="ts">
import VTitleBarButtonIcon from '@components/Base/Buttons/VTitleBarButtonIcon.vue';
import SettingsIcon from '@components/Shared/Icons/SettingsIcon.vue';
import { useSettingsStore } from '@stores/Settings';
import { useKeyboardShortcuts } from '@composables/Miscellaneous/useKeyboardShortcuts';

const settingsStore = useSettingsStore();
useKeyboardShortcuts();
</script>

<template>
    <div class="p-1">
        <VTitleBarButtonIcon
            class="h-full w-full"
            :windows="['Ctrl', 'Alt', 'S']"
            :mac-os="['⌘', 'Alt', 'S']"
            :is-active="settingsStore.showSettings"
            @click="settingsStore.showSettings = !settingsStore.showSettings"
        >
            <SettingsIcon />

            <template #tooltipLabel>Settings</template>
        </VTitleBarButtonIcon>
    </div>
</template>
