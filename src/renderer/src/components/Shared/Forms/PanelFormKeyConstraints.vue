<script setup lang="ts">
import PanelFormKeyConstraintsButton from '@components/Shared/Forms/PanelFormKeyConstraintsButton.vue';

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
            <PanelFormKeyConstraintsButton
                class="mr-2"
                :is-active="modelValue === 'PK'"
                @click="onClickToggleModelValue('PK', $event)"
            >
                Primary Key
            </PanelFormKeyConstraintsButton>
            <PanelFormKeyConstraintsButton
                :is-active="modelValue === 'FK'"
                @click="onClickToggleModelValue('FK', $event)"
            >
                Foreign Key
            </PanelFormKeyConstraintsButton>
        </div>
    </div>
</template>
