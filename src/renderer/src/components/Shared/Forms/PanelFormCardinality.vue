<script setup lang="ts">
import VPanelDropdown from '@components/Base/Forms/VPanelDropdown.vue';
import VPanelDropdownItem from '@components/Base/Forms/VPanelDropdownItem.vue';
import VPanelDropdownItemDisable from '@components/Base/Forms/VPanelDropdownItemDisable.vue';

const { modelValue } = defineModels<{
    modelValue:
        | 'one-to-one'
        | 'one-to-many'
        | 'many-to-many'
        | 'many-to-one'
        | string;
}>();
</script>

<template>
    <VPanelDropdown id="panelFormCardinality" v-model="modelValue">
        <template #label>Select Cardinality:</template>
        <VPanelDropdownItemDisable
            >-- Please Select --
        </VPanelDropdownItemDisable>
        <VPanelDropdownItem value="one-to-one">One To One</VPanelDropdownItem>
        <VPanelDropdownItem value="one-to-many">One To Many</VPanelDropdownItem>
        <VPanelDropdownItem value="many-to-one">Many To One</VPanelDropdownItem>
        <VPanelDropdownItem value="many-to-many"
            >Many To Many
        </VPanelDropdownItem>
    </VPanelDropdown>
</template>
