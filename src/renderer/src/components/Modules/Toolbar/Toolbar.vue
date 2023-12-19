<script setup lang="ts">
import AddNewTableButton from '@components/Modules/Toolbar/Partials/AddNewTableButton.vue';
import AutoLayoutButton from '@components/Modules/Toolbar/Partials/AutoLayoutButton.vue';
import ChangeOrientationButton from '@components/Modules/Toolbar/Partials/ChangeOrientationButton.vue';
import ExportButton from '@components/Modules/Toolbar/Partials/ExportButton.vue';
import RedoButton from '@components/Modules/Toolbar/Partials/RedoButton.vue';
import SaveButton from '@components/Modules/Toolbar/Partials/SaveButton.vue';
</script>

<template>
    <div class="flex items-center justify-between px-2 py-3 dark:bg-dark-900">
        <div>
            <AddNewTableButton class="mr-1.5" />
            <AutoLayoutButton class="mr-1.5" />
            <ChangeOrientationButton class="mr-1.5" />
            <ExportButton />
        </div>
        <div>
            <RedoButton class="mr-2" />
            <SaveButton />
        </div>
    </div>
</template>
