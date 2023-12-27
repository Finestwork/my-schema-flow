<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';
import SunIcon from '@components/Shared/Icons/SunIcon.vue';
import NightIcon from '@components/Shared/Icons/NightIcon.vue';
import { useDarkMode } from '@composables/Miscellaneous/useDarkMode';

const { isDarkMode, toggleDarkMode } = useDarkMode();
const onClickToggleDarkMode = () => {
    toggleDarkMode();
    window.api.toggleDarkMode(isDarkMode.value);
};
</script>

<template>
    <VToolbarButtonIcon @click="onClickToggleDarkMode">
        <NightIcon v-if="isDarkMode" />
        <SunIcon v-else />
        <template #tooltip>
            <VTooltipKeyboardText
                :mac="['⌘', 'Shift', 'M']"
                :windows="['Ctrl', 'Shift', 'M']"
            >
                <template #label>Toggle Dark Mode</template>
            </VTooltipKeyboardText>
        </template>
    </VToolbarButtonIcon>
</template>
