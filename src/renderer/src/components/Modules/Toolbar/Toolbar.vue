<script setup lang="ts">
import AddNewTableButton from '@components/Modules/Toolbar/Partials/AddNewTableButton.vue';
import AutoLayoutButton from '@components/Modules/Toolbar/Partials/AutoLayoutButton.vue';
import ChangeOrientationButton from '@components/Modules/Toolbar/Partials/ChangeOrientationButton.vue';
import ExportButton from '@components/Modules/Toolbar/Partials/ExportButton.vue';
</script>

<template>
    <div class="flex items-center p-2 dark:bg-dark-900">
        <AddNewTableButton class="mr-1.5" />
        <AutoLayoutButton class="mr-1.5" />
        <ChangeOrientationButton class="mr-1.5" />
        <ExportButton />
    </div>
</template>
