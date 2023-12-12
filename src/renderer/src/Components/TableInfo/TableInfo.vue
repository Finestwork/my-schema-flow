<script setup lang="ts">
import RelationSettings from '@components/TableInfo/RelationSettings/RelationSettings.vue';
import TableSettings from '@components/TableInfo/TableSettings/TableSettings.vue';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
</script>

<template>
    <OverlayScrollbarsComponent
        class="h-full w-[25%] overflow-y-scroll border-l-2 border-dark-600 bg-white dark:bg-dark-800"
    >
        <TableSettings />
        <RelationSettings />
    </OverlayScrollbarsComponent>
</template>
