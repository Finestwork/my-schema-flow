<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
</script>

<template>
    <VPanelTextInput
        id="addColumnNameForm"
        v-model="modelValue"
        placeholder="Place column name here"
    >
        <template #label>Column Name:</template>
    </VPanelTextInput>
</template>
