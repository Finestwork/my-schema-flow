<script setup lang="ts">
import Canvas from '@components/Canvas/Canvas.vue';
import TableInfo from '@components/TableInfo/TableInfo.vue';
import TitleBar from '@components/TitleBar/TitleBar.vue';
import Toolbar from '@components/Toolbar/Toolbar.vue';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const titleBar = ref();
const contentWrapper = ref();
const updateHeight = () => {
    const TitleBarComponent = <typeof TitleBar>titleBar.value;
    const TitleBar = TitleBarComponent.$el;
    Object.assign(contentWrapper.value.style, {
        paddingTop: `${TitleBar.getBoundingClientRect().height / 16}rem`,
    });
};
onMounted(async () => {
    await nextTick();
    document.documentElement.classList.add('dark');
    updateHeight();
    window.addEventListener('resize', updateHeight);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateHeight);
});
</script>

<template>
    <TitleBar ref="titleBar" />
    <div ref="contentWrapper">
        <div class="flex h-[calc(100vh-40px)] justify-between dark:bg-dark-900">
            <div class="h-full w-full">
                <Toolbar />
                <Canvas class="h-[calc(100vh-49.4px-40px)] w-full" />
            </div>
            <TableInfo />
        </div>
    </div>
</template>
