<script setup lang="ts">
import VTableIcon from '@components/Shared/Icons/VTableIcon.vue';
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
</script>
<template>
    <div class="px-2 py-3 dark:bg-dark-800">
        <BaseButtonIcon>
            <VTableIcon />
            <template #tooltip>Create Table</template>
        </BaseButtonIcon>
    </div>
</template>
