<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
</script>
<template>
    <div class="bg-white dark:bg-dark-900">
        <OverlayScrollbarsComponent
            class="scrollbar h-full w-full dark:bg-dark-800/20"
        >
            <slot></slot>
        </OverlayScrollbarsComponent>
    </div>
</template>
