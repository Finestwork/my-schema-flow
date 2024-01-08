<script setup lang="ts">
import OpenFileButton from '@components/Modules/Toolbar/Partials/ImportFileButton.vue';
import AddNewTableButton from '@components/Modules/Toolbar/Partials/AddNewTableButton.vue';
import AutoLayoutButton from '@components/Modules/Toolbar/Partials/AutoLayoutButton.vue';
import ChangeOrientationButton from '@components/Modules/Toolbar/Partials/ChangeOrientationButton.vue';
import ExportAsImageButton from '@components/Modules/Toolbar/Partials/ExportToImageButton.vue';
import UndoButton from '@components/Modules/Toolbar/Partials/UndoButton.vue';
import RedoButton from '@components/Modules/Toolbar/Partials/RedoButton.vue';
import SaveButton from '@components/Modules/Toolbar/Partials/SaveButton.vue';
import ExportFileButton from '@components/Modules/Toolbar/Partials/ExportFileButton.vue';
import PlaygroundButton from './Partials/PlaygroundButton.vue';
</script>

<template>
    <div
        class="flex items-center justify-between border-b-2 border-b-slate-300 bg-white px-2 py-3 dark:border-b-dark-700 dark:bg-dark-900"
    >
        <div>
            <OpenFileButton class="mr-2" />
            <ExportAsImageButton class="mr-2" />
            <ExportFileButton class="mr-2" />
            <PlaygroundButton class="mr-2" />
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
