<script setup lang="ts">
import ToggleDarkModeButton from '@components/Modules/Toolbar/Partials/ToggleDarkModeButton.vue';
import OpenFileButton from '@components/Modules/Toolbar/Partials/OpenFileButton.vue';
import AddNewTableButton from '@components/Modules/Toolbar/Partials/AddNewTableButton.vue';
import AutoLayoutButton from '@components/Modules/Toolbar/Partials/AutoLayoutButton.vue';
import ChangeOrientationButton from '@components/Modules/Toolbar/Partials/ChangeOrientationButton.vue';
import ExportButton from '@components/Modules/Toolbar/Partials/ExportButton.vue';
import UndoButton from '@components/Modules/Toolbar/Partials/UndoButton.vue';
import RedoButton from '@components/Modules/Toolbar/Partials/RedoButton.vue';
import SaveButton from '@components/Modules/Toolbar/Partials/SaveButton.vue';
import ExportFileButton from '@components/Modules/Toolbar/Partials/ExportFileButton.vue';
</script>

<template>
    <div
        class="flex items-center justify-between bg-white px-2 py-3 dark:bg-dark-900"
    >
        <div>
            <OpenFileButton class="mr-2" />
            <ToggleDarkModeButton class="mr-2" />
            <ExportButton class="mr-2" />
            <ExportFileButton class="mr-2" />
        </div>

        <div class="flex">
            <AddNewTableButton class="mr-2" />
            <AutoLayoutButton class="mr-2" />
            <ChangeOrientationButton />
        </div>
        <div class="flex items-center">
            <UndoButton class="mr-2" />
            <RedoButton class="mr-2" />
            <SaveButton />
        </div>
    </div>
</template>
