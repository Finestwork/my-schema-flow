<script setup lang="ts">
import VPanelTextInputNumber from '@components/Base/Forms/VPanelTextInputNumber.vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
</script>

<template>
    <VPanelTextInputNumber
        v-model="modelValue"
        id="addColumnLengthForm"
        placeholder="Place column length here"
    >
        <template #label>Column Length:</template>
    </VPanelTextInputNumber>
</template>
