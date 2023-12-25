<script setup lang="ts">
import SunIcon from '@components/Shared/Icons/SunIcon.vue';
import NightIcon from '@components/Shared/Icons/NightIcon.vue';
import { useDarkMode } from '@composables/Miscellaneous/useDarkMode';

const { isDark, toggleDarkMode } = useDarkMode();
</script>

<template>
    <button
        class="aspect-square h-full rounded p-1.5 outline-none dark:bg-dark-800/70 dark:stroke-slate-400 dark:hover:bg-cyan-950/50 dark:hover:stroke-cyan-500"
        type="button"
        @click="toggleDarkMode"
    >
        <SunIcon v-if="isDark" />
        <NightIcon v-else />
    </button>
</template>
