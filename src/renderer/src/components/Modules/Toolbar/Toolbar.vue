<script setup lang="ts">
import AddNewTableButton from '@components/Modules/Toolbar/Partials/AddNewTableButton.vue';
import AutoLayoutButton from '@components/Modules/Toolbar/Partials/AutoLayoutButton.vue';
import ChangeOrientationButton from '@components/Modules/Toolbar/Partials/ChangeOrientationButton.vue';
import ExportButton from '@components/Modules/Toolbar/Partials/ExportButton.vue';
import UndoButton from '@components/Modules/Toolbar/Partials/UndoButton.vue';
import RedoButton from '@components/Modules/Toolbar/Partials/RedoButton.vue';
import SaveButton from '@components/Modules/Toolbar/Partials/SaveButton.vue';
import type { TExportTypes as TImageExport } from '@utilities/ExportHelper';

const emits = defineEmits<{
    (e: 'runLayout', value: MouseEvent): void;
    (e: 'changeOrientation'): void;
    (e: 'exportImage', value: TImageExport): void;
}>();
</script>

<template>
    <div class="flex items-center justify-between px-2 py-3 dark:bg-dark-900">
        <div>
            <AddNewTableButton class="mr-1.5" />
            <AutoLayoutButton
                class="mr-1.5"
                @click="emits('runLayout', $event)"
            />
            <ChangeOrientationButton
                class="mr-1.5"
                @change-orientation="emits('changeOrientation')"
            />
            <ExportButton @export-image="emits('exportImage', $event)" />
        </div>
        <div class="flex items-center">
            <UndoButton class="mr-1.5" />
            <RedoButton class="mr-2" />
            <SaveButton />
        </div>
    </div>
</template>
