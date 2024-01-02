<script setup lang="ts">
import VSwitchCheckbox from '@components/Base/Forms/VSwitchCheckbox.vue';
import { ref } from 'vue';

const checkboxEnabled = ref(false);
</script>
<template>
    <div>
        <VSwitchCheckbox
            id="toggleDarkMode"
            v-model="checkboxEnabled"
            for="toggleDarkMode"
        >
            <template #label>Toggle Dark Mode</template>
        </VSwitchCheckbox>
    </div>
</template>
