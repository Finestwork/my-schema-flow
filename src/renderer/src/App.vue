<script setup lang="ts">
import Canvas from '@components/Canvas.vue';
import TableInfo from '@components/TableInfo.vue';
import Titlebar from '@components/Titlebar.vue';
import { isDarkMode } from '@composables/useDarkModeDetection';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const titleBar = ref();
const contentWrapper = ref();
isDarkMode();
const updateHeight = () => {
    const TitleBarComponent = <typeof Titlebar>titleBar.value;
    const TitleBar = TitleBarComponent.$el;
    Object.assign(contentWrapper.value.style, {
        paddingTop: `${TitleBar.getBoundingClientRect().height / 16}rem`,
    });
};
onMounted(async () => {
    await nextTick();
    updateHeight();
    window.addEventListener('resize', updateHeight);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateHeight);
});
</script>

<template>
    <Titlebar ref="titleBar" />
    <div ref="contentWrapper" class="flex h-screen justify-between dark:bg-dark-900">
        <Canvas />
        <TableInfo />
    </div>
</template>
