<script lang="ts" setup>
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import { useFileStore } from '@stores/File';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';
import { ref } from 'vue';

const emits = defineEmits<{
    (e: 'blur'): void;
    (e: 'onEnter'): void;
}>();
const fileStore = useFileStore();
const currentFileName = ref(fileStore.getFileNameWithoutExt);
const { saveCanvas, overwriteFileName } = useSaveCanvas();

const onEnterSaveFile = () => {
    // If file is saved
    if (fileStore.fileName.trim() === '') {
        saveCanvas();
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
    <VPanelTextInput
        id="titleBarFileName"
        v-model="currentFileName"
        placeholder="Place file name here"
        @keydown.enter="onEnterSaveFile"
        @blur="onBlurResetForm"
    />
</template>
