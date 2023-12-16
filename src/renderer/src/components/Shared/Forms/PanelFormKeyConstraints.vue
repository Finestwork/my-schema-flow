<script setup lang="ts">
import PanelFormSelectButton from '@components/Shared/Forms/PanelFormSelectButton.vue';

const { modelValue } = defineModels<{
    modelValue: 'PK' | 'FK';
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
            <PanelFormSelectButton
                class="mr-2"
                :is-active="modelValue === 'PK'"
                @click="onClickToggleModelValue('PK', $event)"
            >
                Primary Key
            </PanelFormSelectButton>
            <PanelFormSelectButton
                :is-active="modelValue === 'FK'"
                @click="onClickToggleModelValue('FK', $event)"
            >
                Foreign Key
            </PanelFormSelectButton>
        </div>
    </div>
</template>
