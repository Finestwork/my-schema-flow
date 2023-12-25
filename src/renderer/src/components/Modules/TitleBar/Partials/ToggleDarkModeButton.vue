<script setup lang="ts">
import SunIcon from '@components/Shared/Icons/SunIcon.vue';
import NightIcon from '@components/Shared/Icons/NightIcon.vue';
import { useDarkMode } from '@composables/Miscellaneous/useDarkMode';

const { isDark, toggleDarkMode } = useDarkMode();
const onClickToggleDarkMode = () => {
    toggleDarkMode();
    window.api.toggleDarkMode(isDark.value);
};
</script>

<template>
    <button
        class="aspect-square h-full rounded bg-slate-300 stroke-slate-600 p-1.5 outline-none hover:bg-cyan-500 hover:stroke-white dark:bg-dark-800/70 dark:stroke-slate-400 dark:hover:bg-cyan-950/50 dark:hover:stroke-cyan-500"
        type="button"
        @click="onClickToggleDarkMode"
    >
        <NightIcon v-if="isDark" />
        <SunIcon v-else />
    </button>
</template>
