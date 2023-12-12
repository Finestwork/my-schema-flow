<script setup lang="ts">
import Canvas from '@components/Canvas/Canvas.vue';
import TableInfo from '@components/TableInfo/TableInfo.vue';
import AppInfo from '@components/AppInfo/AppInfo.vue';
import TitleBar from '@components/TitleBar/TitleBar.vue';
import Toolbar from '@components/Toolbar/Toolbar.vue';
import { useAutoLayout } from '@composables/useAutoLayout';
import { useIPCListeners } from '@composables/useIPCListeners';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const titleBar = ref();
const contentWrapper = ref();
const isCreatingTable = ref(false);
const { runAutoLayout } = useAutoLayout();
const { onFileSave, onFileOpened } = useIPCListeners();

const updateHeight = () => {
    const TitleBarComponent = <typeof TitleBar>titleBar.value;
    const TitleBar = TitleBarComponent.$el;
    Object.assign(contentWrapper.value.style, {
        paddingTop: `${TitleBar.getBoundingClientRect().height / 16}rem`,
    });
};
onMounted(async () => {
    await nextTick();
    updateHeight();
    onFileSave();
    onFileOpened();
    document.documentElement.classList.add('dark');
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
            <AppInfo />
            <div class="h-full w-full">
                <Toolbar
                    @create-table="isCreatingTable = true"
                    @change-layout-orientation="runAutoLayout"
                />
                <Canvas
                    v-model:is-creating-table="isCreatingTable"
                    class="h-[calc(100vh-49.4px-40px)] w-full"
                />
            </div>
            <TableInfo />
        </div>
    </div>
</template>
