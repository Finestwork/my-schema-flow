<script setup lang="ts">
import VPanelDropdown from '@components/Base/Forms/VPanelDropdown.vue';
import VPanelDropdownItem from '@components/Base/Forms/VPanelDropdownItem.vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
</script>
<template>
    <VPanelDropdown id="rm" v-model="modelValue">
        <template #label>Index Type:</template>
        <VPanelDropdownItem value="non-unique">NON-UNIQUE</VPanelDropdownItem>
        <VPanelDropdownItem value="unique">UNIQUE</VPanelDropdownItem>
        <VPanelDropdownItem value="spatial">SPATIAL</VPanelDropdownItem>
        <VPanelDropdownItem value="fulltext">FULL TEXT</VPanelDropdownItem>
    </VPanelDropdown>
</template>
