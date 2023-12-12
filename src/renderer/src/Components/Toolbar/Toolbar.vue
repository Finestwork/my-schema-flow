<script setup lang="ts">
import VTableIcon from '@components/Shared/Icons/VTableIcon.vue';
import VAutoLayoutIcon from '@components/Shared/Icons/VAutoLayoutIcon.vue';
import BaseButtonIcon from '@components/Toolbar/Partials/BaseButtonIcon.vue';
import OpenFileButton from '@components/Toolbar/Partials/OpenFileButton.vue';
import ChangeLayoutButton from '@components/Toolbar/Partials/ChangeLayoutButton.vue';
import ExportButton from '@components/Toolbar/Partials/ExportButton.vue';
import RedoUndoButton from '@components/Toolbar/Partials/RedoUndoButton.vue';
import SaveButton from '@components/Toolbar/Partials/SaveButton.vue';
import { useTableStore } from '@stores/TableStore';

const emits = defineEmits<{
    (event: 'changeLayoutOrientation'): void;
}>();
const tableStore = useTableStore();

const onClickCreateTable = () => {
    tableStore.isCreatingTable = true;
};
</script>

<template>
    <div class="flex items-center justify-between px-2 py-3 dark:bg-dark-850">
        <div class="flex">
            <OpenFileButton class="mr-2" />
            <BaseButtonIcon class="mr-2" @click="onClickCreateTable">
                <VTableIcon />
                <template #tooltip>Create Table</template>
            </BaseButtonIcon>
            <BaseButtonIcon class="mr-2" @click="emits('changeLayoutOrientation')">
                <VAutoLayoutIcon />
                <template #tooltip>Auto Layout</template>
            </BaseButtonIcon>
            <ChangeLayoutButton class="mr-2" @click="emits('changeLayoutOrientation')" />
            <ExportButton />
        </div>

        <div class="flex">
            <RedoUndoButton class="mr-2" />
            <SaveButton />
        </div>
    </div>
</template>
