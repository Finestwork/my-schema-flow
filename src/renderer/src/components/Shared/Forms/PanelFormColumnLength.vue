<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
</script>

<template>
    <VPanelTextInput
        id="addColumnLengthForm"
        v-model="modelValue"
        :is-number="true"
        placeholder="Place column length here"
    >
        <template #label>Column Length:</template>
    </VPanelTextInput>
</template>
