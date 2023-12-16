<script setup lang="ts">
import PanelFormSelectButton from '@components/Shared/Forms/PanelFormSelectButton.vue';

const { modelValue } = defineModels<{
    modelValue: boolean;
}>();
</script>

<template>
    <div>
        <span class="mb-1.5 block text-xs font-semibold dark:text-slate-300"
            >Null Type:</span
        >
        <div class="flex">
            <PanelFormSelectButton
                class="mr-2 w-6/12"
                :is-active="modelValue"
                @click="modelValue = !modelValue"
            >
                Null</PanelFormSelectButton
            >
            <span class="block w-6/12"></span>
        </div>
    </div>
</template>
