<script setup lang="ts">
import VSwitchForm from '@components/Base/Forms/VSwitchForm.vue';
import { useSettingsStore } from '@stores/Settings';

const settingsStore = useSettingsStore();
</script>

<template>
    <VSwitchForm
        id="toggleJumpAnimation"
        v-model="settingsStore.viewJumpAnimation"
        for="toggleJumpAnimation"
    >
        <template #label>Toggle Jump Animation</template>
        <template #helper>
            Toggle the switch to activate the jumping animation when switching
            between table views.
        </template>
    </VSwitchForm>
</template>
