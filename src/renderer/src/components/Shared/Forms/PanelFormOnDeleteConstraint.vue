<script setup lang="ts">
import VPanelAutoComplete from '@components/Base/Forms/VPanelAutoComplete.vue';
import { useCanvasStore } from '@stores/Canvas';
import { watch } from 'vue';

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
        id="addOnDeleteConstraint"
        v-model="modelValue"
        placeholder="Place action here on delete"
        :dropdown-items="CONSTRAINTS"
        :no-whitespace="false"
    >
        <template #label>On Delete:</template>
    </VPanelAutoComplete>
</template>
