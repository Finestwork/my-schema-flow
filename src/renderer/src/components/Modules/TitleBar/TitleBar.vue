<script setup lang="ts">
import Logo from '@components/Modules/TitleBar/Partials/Logo.vue';
import TextInput from '@components/Modules/TitleBar/Partials/TextInput.vue';
import SettingsButtonIcon from '@components/Modules/TitleBar/Partials/SettingsButtonIcon.vue';
import { useFileStore } from '@stores/File';
import { useTrackChange } from '@composables/History/useTrackChange';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { computed, ref } from 'vue';

const fileStore = useFileStore();
const isEditing = ref(false);
const isLoading = ref(false);
const { hasChanged } = useTrackChange();
const { overwriteFileName } = useSaveCanvas();
const defaultFileName = computed(() => {
    if (fileStore.filePath === '') {
        return 'Untitled';
    }

    const FileName = fileStore.fileName.split('.')[0];
    return hasChanged.value ? `${FileName} (Unsaved)` : FileName;
});
const onEnterSaveCurrentFile = async (fileName: string) => {
    isLoading.value = true;
    await overwriteFileName(fileName);
    isLoading.value = false;
};
</script>

<template>
    <div
        class="drag-title-bar relative z-[500] flex h-[48px] select-none items-center bg-slate-900 px-2 dark:bg-dark-950"
    >
        <div class="flex h-full w-full items-center justify-between py-2">
            <div class="flex h-full flex-grow items-center">
                <Logo class="no-drag-title-bar mr-2" />
                <div class="flex h-full items-center">
                    <span
                        v-if="fileStore.filePath === ''"
                        class="no-drag-title-bar text-xs font-semibold text-slate-300 dark:text-slate-500"
                        >{{ defaultFileName }}</span
                    >
                    <template v-else>
                        <template v-if="!isLoading">
                            <button
                                v-if="!isEditing"
                                class="no-drag-title-bar h-full rounded px-2 text-xs font-semibold text-slate-300 outline-none hover:bg-cyan-500 hover:text-cyan-50 focus:bg-cyan-500 focus:text-cyan-50 hover:dark:bg-cyan-950/30 hover:dark:text-cyan-500 focus:dark:text-cyan-500"
                                type="button"
                                @dblclick="isEditing = true"
                            >
                                {{ defaultFileName }}
                            </button>
                            <TextInput
                                v-else
                                class="no-drag-title-bar text-slate-300"
                                @on-enter="onEnterSaveCurrentFile"
                                @blur="isEditing = false"
                            />
                        </template>
                        <p
                            v-else
                            class="no-drag-title-bar text-xs font-semibold text-slate-300 dark:text-slate-400"
                        >
                            Saving, please don't exit.
                        </p>
                    </template>
                </div>
            </div>

            <div class="flex h-full flex-grow justify-end pr-[8rem]">
                <SettingsButtonIcon class="no-drag-title-bar" />
            </div>
        </div>
    </div>
</template>
