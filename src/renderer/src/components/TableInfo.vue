<script setup lang="ts">
import TableInfoTableSettings from '@components/TableInfoTableSettings.vue';
import TableInfoRelationSettings from '@components/TableInfoRelationSettings.vue';
</script>

<template>
    <div class="h-full w-[25%] border-l-2 border-dark-600 bg-white dark:bg-dark-800">
        <TableInfoTableSettings />
        <TableInfoRelationSettings />
    </div>
</template>
