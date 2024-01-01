<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/Canvas';
import { computed, watch } from 'vue';

const { modelValue } = defineModels<{
    modelValue: string;
}>();
const canvasStore = useCanvasStore();
const CONSTRAINTS = [
    'RESTRICT',
    'CASCADE',
    'SET NULL',
    'NO ACTION',
    'SET DEFAULT',
];

// Everytime active node changes, reset model value
watch(
    () => canvasStore.currentActiveNode,
    () => {
        modelValue.value = '';
    },
);
</script>

<template>
    <VPanelAutoComplete
        id="addOnUpdateConstraint"
        v-model="modelValue"
        placeholder="ON UPDATE"
        :dropdown-items="CONSTRAINTS"
        default-value="NO ACTION"
    >
        <template #label>On Update:</template>
    </VPanelAutoComplete>
</template>
