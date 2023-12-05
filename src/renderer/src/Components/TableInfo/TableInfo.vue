<script setup lang="ts">
import RelationSettings from '@components/TableInfo/RelationSettings/RelationSettings.vue';
import TableSettings from '@components/TableInfo/TableSettings/TableSettings.vue';
</script>

<template>
    <div
        class="scrollbar-slim h-full w-[25%] overflow-y-scroll border-l-2 border-dark-600 bg-white dark:bg-dark-800"
    >
        <TableSettings />
        <RelationSettings />
    </div>
</template>
