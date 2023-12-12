<script setup lang="ts">
import History from '@components/AppInfo/History/History.vue';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
</script>
<template>
    <OverlayScrollbarsComponent
        class="h-full w-[25%] overflow-y-scroll border-dark-600 bg-white dark:bg-dark-800"
    >
        <History />
    </OverlayScrollbarsComponent>
</template>
