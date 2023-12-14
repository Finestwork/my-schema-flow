<script setup lang="ts">
import TitleBar from '@components/Modules/TitleBar/TitleBar.vue';
import Canvas from '@components/Modules/Canvas/Canvas.vue';
import { useDarkMode } from '@composables/useDarkMode';

const { toggleDarkMode } = useDarkMode();

toggleDarkMode();
</script>

<template>
    <div class="text-black">
        <TitleBar />
        <div class="flex h-[calc(100vh-42px)] w-full dark:bg-dark-900">
            <div class="w-full max-w-[250px] dark:bg-dark-900"></div>
            <div class="w-full">
                <Canvas />
            </div>
            <div class="w-full max-w-[250px] dark:bg-dark-900"></div>
        </div>
    </div>
</template>
