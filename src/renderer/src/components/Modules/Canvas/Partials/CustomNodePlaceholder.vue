<script setup lang="ts">
import { usePlaceholder } from '@composables/Canvas/usePlaceholder';
import { ref } from 'vue';

const placeholder = ref();
const { canShow } = usePlaceholder(placeholder);
</script>

<template>
    <span
        ref="placeholder"
        v-if="canShow"
        class="font-jetbrains absolute min-h-[50px] w-[100px] overflow-hidden rounded border-2 opacity-50 hover:cursor-pointer dark:border-slate-700 dark:bg-dark-800"
    ></span>
</template>
