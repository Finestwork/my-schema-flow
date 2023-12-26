<script setup lang="ts">
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
    <button
        class="aspect-square h-full rounded bg-cyan-200 stroke-cyan-600 p-1.5 outline-none hover:bg-cyan-300/80 dark:bg-dark-800/70 dark:stroke-slate-400 dark:hover:bg-cyan-950/50 dark:hover:stroke-cyan-500"
        type="button"
        @click="onClickToggleDarkMode"
    >
        <NightIcon v-if="isDarkMode" />
        <SunIcon v-else />
    </button>
</template>
