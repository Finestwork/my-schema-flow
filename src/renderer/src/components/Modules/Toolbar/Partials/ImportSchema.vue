<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';
import { importHelper } from '@utilities/ImportHelper';

const onClickOpenFile = () => {
    importHelper();
    window.api.openSchema('C:\\Users\\Winmri\\Downloads');
};
</script>

<template>
    <VToolbarButtonIcon @click="onClickOpenFile">
        <OpenFileIcon />
        <template #tooltip>
            <VTooltipKeyboardText :mac="['⌘', 'O']" :windows="['Ctrl', 'O']">
                <template #label>Open A File</template>
            </VTooltipKeyboardText>
        </template>
    </VToolbarButtonIcon>
</template>
