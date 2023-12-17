<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
</script>

<template>
    <div>
        <VPanelTextInput
            id="referencingColumn"
            v-model="modelValue"
            placeholder="Place referencing column here"
        >
            <template #label>Referencing Column:</template>
        </VPanelTextInput>
    </div>
</template>
