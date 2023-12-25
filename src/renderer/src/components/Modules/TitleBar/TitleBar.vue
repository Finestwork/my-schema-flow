<script setup lang="ts">
import TextInput from '@components/Modules/TitleBar/Partials/TextInput.vue';
import ToggleDarkModeButton from '@components/Modules/TitleBar/Partials/ToggleDarkModeButton.vue';
import { useFileStore } from '@stores/File';
import { useTrackChange } from '@composables/History/useTrackChange';
import { computed, onMounted, ref } from 'vue';

const fileStore = useFileStore();
const isEditing = ref(false);
const isLoading = ref(false);
const { hasChanged } = useTrackChange();
const defaultFileName = computed(() => {
    if (fileStore.filePath === '') {
        return 'Untitled';
    }

    const FileName = fileStore.fileName.split('.')[0];
    return hasChanged.value ? `${FileName} (Unsaved)` : FileName;
});

onMounted(() => {
    window.electron.ipcRenderer.on('fileNameOverwriteSuccessfully', () => {
        // Add timeout to avoid content jumping
        setTimeout(() => {
            isLoading.value = false;
        }, 350);
    });
    window.electron.ipcRenderer.on('cantUpdateFileName', () => {
        isLoading.value = false;
    });
});
</script>

<template>
    <div
        class="drag-title-bar relative z-[500] flex h-[40px] select-none items-center bg-slate-200 px-2 dark:bg-dark-950"
    >
        <div class="flex h-full w-full items-center justify-between py-2">
            <div class="no-drag-title-bar h-full flex-grow">
                <span
                    v-if="fileStore.filePath === ''"
                    class="text-xs font-semibold text-slate-800 dark:text-slate-500"
                    >{{ defaultFileName }}</span
                >
                <template v-else>
                    <template v-if="!isLoading">
                        <button
                            v-if="!isEditing"
                            class="h-full rounded px-2 text-xs font-semibold text-slate-500 outline-none hover:bg-cyan-500 hover:text-cyan-50 focus:bg-cyan-500 focus:text-cyan-50 hover:dark:bg-cyan-950/30 hover:dark:text-cyan-500 focus:dark:text-cyan-500"
                            type="button"
                            @dblclick="isEditing = true"
                        >
                            {{ defaultFileName }}
                        </button>
                        <TextInput
                            v-else
                            @on-enter="isLoading = true"
                            @blur="isEditing = false"
                        />
                    </template>
                    <p
                        v-else
                        class="text-xs font-semibold text-slate-800 dark:text-slate-400"
                    >
                        Saving, please don't exit.
                    </p>
                </template>
            </div>
            <div
                class="no-drag-title-bar flex h-full flex-grow justify-end pr-[8.5rem]"
            >
                <ToggleDarkModeButton />
            </div>
        </div>
    </div>
</template>
