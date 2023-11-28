<script setup lang="ts">
import IconChevron from '@components/IconChevron.vue';
import { animateIcon } from '@composables/useCollapseAnimation';
import { ref } from 'vue';

const { showForm } = defineModels<{
    showForm: boolean;
}>();
const iconWrapper = ref();
const onClickToggleSettings = () => {
    showForm.value = !showForm.value;
    animateIcon(iconWrapper.value, showForm.value);
};
</script>
<template>
    <div>
        <button
            class="flex w-full items-center justify-between px-2 py-2.5 text-left dark:bg-dark-700"
            :class="{
                'dark:hover:bg-dark-700/70 dark:focus:bg-dark-700/70': showForm,
                'cursor-not-allowed': !showForm,
            }"
            :disabled="!showForm"
            type="button"
            @click="onClickToggleSettings"
        >
            <span
                class="text-xs font-semibold"
                :class="{
                    'dark:text-dark-300': showForm,
                    'cursor-not-allowed dark:text-dark-500': !showForm,
                }"
                >Table Settings</span
            >
            <span
                ref="iconWrapper"
                class="block w-[12px]"
                :class="{
                    'dark:stroke-dark-300': showForm,
                    '-rotate-90 dark:stroke-dark-500': !showForm,
                }"
            >
                <IconChevron />
            </span>
        </button>

        <div v-if="showForm">
            <div class="mx-2 pb-4 pt-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
