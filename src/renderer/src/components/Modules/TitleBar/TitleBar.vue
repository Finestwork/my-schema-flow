<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import Loader from '@components/Modules/TitleBar/Partials/Loader.vue';
import { useFileStore } from '@stores/File';
import { useTrackChange } from '@composables/History/useTrackChange';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { computed, nextTick, onMounted, ref } from 'vue';

const fileStore = useFileStore();
const input = ref();
const isEditing = ref(false);
const isLoading = ref(false);
const currentFileName = ref('');
const { hasChanged } = useTrackChange();
const { saveCanvas, overwriteFileName } = useSaveCanvas();
const defaultFileName = computed(() => {
    if (fileStore.filePath === '') {
        return 'Untitled';
    }

    const FileName = fileStore.fileName.split('.')[0];
    return hasChanged.value ? `${FileName} (Unsaved)` : FileName;
});
const onEnterSaveFile = () => {
    // If file is saved
    if (fileStore.fileName.trim() === '') {
        saveCanvas();
        return;
    }

    isLoading.value = true;
    overwriteFileName(currentFileName.value);
};
const onBlurResetForm = () => {
    currentFileName.value = fileStore.getFileNameWithoutExt;
    isEditing.value = false;
};
onMounted(() => {
    window.electron.ipcRenderer.on('fileNameOverwriteSuccessfully', () => {
        // Add timeout to avoid content jumping
        setTimeout(() => {
            currentFileName.value = fileStore.getFileNameWithoutExt;
            isLoading.value = false;
        }, 350);
    });
    window.electron.ipcRenderer.on('fileSavedSuccessfully', async () => {
        await nextTick();
        currentFileName.value = fileStore.getFileNameWithoutExt;
    });
});
</script>

<template>
    <div
        class="drag-title-bar relative z-[500] flex h-[40px] select-none items-center px-2 dark:bg-dark-950"
    >
        <div class="no-drag-title-bar flex h-full items-center py-2">
            <span
                v-if="fileStore.filePath === ''"
                class="text-xs font-semibold dark:text-slate-500"
                >{{ defaultFileName }}</span
            >
            <template v-else>
                <template v-if="!isLoading">
                    <button
                        v-if="!isEditing"
                        class="h-full rounded px-2 text-xs font-semibold outline-none dark:text-slate-500 hover:dark:bg-cyan-950/30 hover:dark:text-cyan-500 focus:dark:text-cyan-500"
                        type="button"
                        @dblclick="isEditing = true"
                    >
                        {{ defaultFileName }}
                    </button>
                    <VPanelTextInput
                        v-else
                        id="titleBarFileName"
                        ref="input"
                        v-model="currentFileName"
                        placeholder="Place file name here"
                        @keydown.enter="onEnterSaveFile"
                        @blur="onBlurResetForm"
                    />
                </template>
                <Loader v-else />
            </template>
        </div>
    </div>
</template>
