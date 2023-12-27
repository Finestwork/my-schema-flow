<script setup lang="ts">
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';

const onClickOpenFile = () => {
    //
};
</script>

<template>
    <VToolbarButtonIcon @click="onClickOpenFile">
        <OpenFileIcon />
        <template #tooltip>
            <VTooltipKeyboardText :mac="['⌘', 'O']" :windows="['Ctrl', 'O']">
                <template #label>Toggle Dark Mode</template>
            </VTooltipKeyboardText>
        </template>
    </VToolbarButtonIcon>
</template>
