<script setup lang="ts">
import Canvas from '@components/Canvas.vue';
import TableInfo from '@components/TableInfo.vue';
import { isDarkMode } from '@composables/useDarkModeDetection';

isDarkMode();
</script>

<template>
    <div class="flex h-screen justify-between dark:bg-dark-900">
        <Canvas />
        <TableInfo />
    </div>
</template>
