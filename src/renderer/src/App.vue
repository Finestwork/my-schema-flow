<script setup lang="ts">
import Canvas from '@components/Canvas.vue';
import TableInformation from '@components/TableInformation.vue';
import { useSettingsStore } from '@stores/SettingsStore';
import { onMounted } from 'vue';

const SettingsStore = useSettingsStore();
onMounted(() => {
    if (SettingsStore.isDarkMode) {
        document.documentElement.classList.add('dark');
    }
});
</script>

<template>
    <div class="dark:bg-dark-900 flex justify-between h-screen">
        <Canvas />
        <TableInformation />
    </div>
</template>
