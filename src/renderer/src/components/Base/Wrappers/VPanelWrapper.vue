<script setup lang="ts">
import { useScrollbar } from '@composables/Miscellaneous/useScrollbar';
import { ref } from 'vue';

const scrollbar = ref();
useScrollbar(scrollbar);
</script>
<template>
    <div class="bg-white dark:bg-dark-900">
        <div
            ref="scrollbar"
            class="scrollbar h-full w-full dark:bg-dark-800/20"
        >
            <slot></slot>
        </div>
    </div>
</template>
