<script setup lang="ts">
import BaseToolbarButtonIcon from '@components/Modules/Toolbar/Partials/BaseToolbarButtonIcon.vue';
import TableIcon from '@components/Shared/Icons/TableIcon.vue';
</script>
<template>
    <div class="p-2 dark:bg-dark-900">
        <BaseToolbarButtonIcon>
            <TableIcon />
            <template #tooltip>Add New Table</template>
        </BaseToolbarButtonIcon>
    </div>
</template>
