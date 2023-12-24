<script setup lang="ts">
import { useFileStore } from '@stores/File';
import { useTrackChange } from '@composables/History/useTrackChange';
import { computed } from 'vue';

const fileStore = useFileStore();
const { hasChanged } = useTrackChange();
const getFileName = computed(() => {
    if (fileStore.filePath === '') {
        return 'Untitled';
    }

    const FileName = fileStore.fileName.split('.')[0];
    return hasChanged.value ? `${FileName} (Unsaved)` : FileName;
});
</script>
<template>
    <div
        class="drag-title-bar relative z-[500] flex h-[40px] select-none items-center px-2 dark:bg-dark-950"
    >
        <p class="text-xs font-semibold dark:text-slate-300">
            {{ getFileName }}
        </p>
    </div>
</template>
