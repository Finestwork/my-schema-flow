<script setup lang="ts">
import { useSettingsStore } from '@stores/SettingsStore';
import { computed } from 'vue';

const settingsStore = useSettingsStore();

const getTitle = computed(() => {
    if (settingsStore.file.name === '') {
        return 'File is not saved';
    }

    const FileName = settingsStore.file.name;
    const Index = FileName.lastIndexOf('.');
    return FileName.substring(0, Index); // Removes the extension
});
</script>
<template>
    <div class="fixed left-0 top-0 z-50 flex h-[40px] w-full items-center px-2 dark:bg-[#0f121c]">
        <p class="text-xs font-semibold text-slate-600">{{ getTitle }}</p>
    </div>
</template>
