<script setup lang="ts">
import { useCanvasStore } from '@stores/CanvasStore';
import { usePlaceholder } from '@composables/usePlaceholder';
import { ref } from 'vue';

const canvasStore = useCanvasStore();
const placeholder = ref();
const { canShow } = usePlaceholder(placeholder);
</script>
<template>
    <span
        v-if="canvasStore.isCreatingTable && canShow"
        ref="placeholder"
        class="font-jetbrains absolute min-h-[50px] w-[100px] overflow-hidden rounded border-2 opacity-50 hover:cursor-pointer dark:border-slate-700 dark:bg-dark-800"
    ></span>
</template>
