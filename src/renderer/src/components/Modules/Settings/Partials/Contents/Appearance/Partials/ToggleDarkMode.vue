<script setup lang="ts">
import VSwitchForm from '@components/Base/Forms/VSwitchForm.vue';
import VFormKeyboardHelper from '@components/Base/Texts/VFormKeyboardHelper.vue';
import { useSettingsStore } from '@stores/Settings';
import { useDarkMode } from '@composables/Miscellaneous/useDarkMode';

const settingsStore = useSettingsStore();
const { toggleDarkMode } = useDarkMode();
</script>

<template>
    <div>
        <VSwitchForm
            id="toggleDarkMode"
            v-model="settingsStore.isDarkMode"
            for="toggleDarkMode"
            @change="toggleDarkMode"
        >
            <template #label>Enable Dark Mode</template>
            <template #helper>
                Toggle the switch to activate the dark mode feature.
            </template>
        </VSwitchForm>
        <VFormKeyboardHelper class="mt-3" :keys="['⌘', 'Shift', 'M']">
            <template #label>MacOS:</template>
        </VFormKeyboardHelper>
        <VFormKeyboardHelper class="mt-4" :keys="['Ctrl', 'Shift', 'M']">
            <template #label>Windows:</template>
        </VFormKeyboardHelper>
    </div>
</template>
