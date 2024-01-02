<script setup lang="ts">
import VTitleBarButtonIcon from '@components/Base/Buttons/VTitleBarButtonIcon.vue';
import SettingsIcon from '@components/Shared/Icons/SettingsIcon.vue';
</script>

<template>
    <VTitleBarButtonIcon
        :windows="['Ctrl', 'Alt', 'S']"
        :mac-os="['⌘', 'Alt', 'S']"
    >
        <SettingsIcon />

        <template #tooltipLabel>Settings</template>
    </VTitleBarButtonIcon>
</template>
