<script setup lang="ts">
import VPanelCheckboxButton from '@components/Base/Forms/VPanelCheckboxButton.vue';

const { modelValue } = defineModels<{
    modelValue: boolean;
}>();
</script>

<template>
    <VPanelCheckboxButton id="nullColumnCheckbox" v-model="modelValue">
        <template #label>Null</template>
    </VPanelCheckboxButton>
</template>
