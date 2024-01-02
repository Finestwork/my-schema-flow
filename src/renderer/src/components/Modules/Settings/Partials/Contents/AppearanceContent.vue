<script setup lang="ts">
import VSwitchForm from '@components/Base/Forms/VSwitchForm.vue';
import VFormKeyboardHelper from '@components/Base/Texts/VFormKeyboardHelper.vue';
import { ref } from 'vue';

const checkboxEnabled = ref(false);
</script>
<template>
    <div>
        <VSwitchForm
            id="toggleDarkMode"
            v-model="checkboxEnabled"
            for="toggleDarkMode"
        >
            <template #label>Toggle Dark Mode</template>
            <template #helper>
                Toggle the switch to activate the dark mode feature.
            </template>
        </VSwitchForm>
        <VFormKeyboardHelper class="mt-3" :keys="['⌘', 'Shift', 'M']">
            <template #label>MacOS: </template>
        </VFormKeyboardHelper>
        <VFormKeyboardHelper class="mt-4" :keys="['Ctrl', 'Shift', 'M']">
            <template #label>Windows: </template>
        </VFormKeyboardHelper>
    </div>
</template>
