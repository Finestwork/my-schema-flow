<script lang="ts" setup>
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import VFloatingLayout from '@components/Base/Floaters/VFloatingLayout.vue';
import { useFileStore } from '@stores/File';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { ref } from 'vue';

const emits = defineEmits<{
    (e: 'blur'): void;
    (e: 'onEnter'): void;
}>();
const fileStore = useFileStore();
const currentFileName = ref(fileStore.getFileNameWithoutExt);
const showError = ref(false);
const unsupportedCharsPattern = /[<>:"/\\|?*]/;
const { overwriteFileName } = useSaveCanvas();

const onInputTrackErrors = () => {
    if (unsupportedCharsPattern.test(currentFileName.value)) {
        showError.value = true;
        return;
    }
    showError.value = false;
};
const onEnterSaveFile = () => {
    if (unsupportedCharsPattern.test(currentFileName.value)) {
        return;
    }
    emits('onEnter');
    overwriteFileName(currentFileName.value);
};
const onBlurResetForm = () => {
    currentFileName.value = fileStore.getFileNameWithoutExt;
    emits('blur');
};
</script>

<template>
    <VFloatingLayout
        class="h-full"
        :show="showError"
        :can-use-focus-trap="false"
    >
        <VPanelTextInput
            id="titleBarFileName"
            v-model="currentFileName"
            placeholder="Place file name here"
            @keydown.enter="onEnterSaveFile"
            @blur="onBlurResetForm"
            @input="onInputTrackErrors"
        />

        <template #float>
            <p
                class="rounded bg-rose-600 px-2 py-1.5 text-[.6rem] text-rose-50"
            >
                File name cannot have these characters: &lsaquo; &rsaquo; : " /
                \ | ? *
            </p>
        </template>
    </VFloatingLayout>
</template>
