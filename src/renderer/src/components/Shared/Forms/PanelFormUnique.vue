<script setup lang="ts">
import VPanelCheckboxButton from '@components/Base/Forms/VPanelCheckboxButton.vue';

const { modelValue } = defineModels<{
    modelValue: boolean;
}>();
</script>

<template>
    <VPanelCheckboxButton id="uniqueColumnCheckbox" v-model="modelValue">
        <template #label>Unique</template>
    </VPanelCheckboxButton>
</template>
