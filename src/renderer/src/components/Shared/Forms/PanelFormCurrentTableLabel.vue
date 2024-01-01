<script setup lang="ts">
import { useCanvasStore } from '@stores/Canvas';
import { computed } from 'vue';

const canvasStore = useCanvasStore();
const getTableName = computed(() => {
    if (canvasStore.hasActiveEdge) {
        return canvasStore.currentActiveEdge.targetNode.data.table.name;
    }

    return canvasStore.currentActiveNode.data.table.name;
});
</script>

<template>
    <div class="text-xs font-bold">
        <span class="block text-slate-700 dark:text-slate-300"
            >Referencing Table:</span
        >
        <span class="block truncate text-slate-500">{{ getTableName }}</span>
    </div>
</template>
