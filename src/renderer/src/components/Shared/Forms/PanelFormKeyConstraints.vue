<script setup lang="ts">
import VPanelSelectButton from '@components/Base/Buttons/VPanelSelectButton.vue';

const { modelValue } = defineModels<{
    modelValue: 'PK' | 'FK' | string;
}>();
const onClickToggleModelValue = (type: string, e: MouseEvent) => {
    (e.target as HTMLButtonElement).blur();
    if (modelValue.value === type) {
        modelValue.value = '';
        return;
    }
    modelValue.value = type;
};
</script>
<template>
    <div>
        <span class="text-xs font-semibold dark:text-slate-300"
            >Key Constraints:</span
        >
        <div class="mt-1.5 flex">
            <VPanelSelectButton
                class="mr-2 w-full"
                :is-active="modelValue === 'PK'"
                @click="onClickToggleModelValue('PK', $event)"
            >
                Primary Key
            </VPanelSelectButton>
            <VPanelSelectButton
                class="w-full"
                :is-active="modelValue === 'FK'"
                @click="onClickToggleModelValue('FK', $event)"
            >
                Foreign Key
            </VPanelSelectButton>
        </div>
    </div>
</template>
