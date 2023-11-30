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
            class="flex w-full items-center justify-between border-b-2 px-2 py-2.5 text-left dark:border-dark-600 dark:bg-dark-700 dark:hover:bg-dark-700/70 dark:focus:bg-dark-700/70"
            type="button"
            @click="onClickToggleSettings"
        >
            <span class="text-xs font-semibold dark:text-dark-300">
                <slot name="label"></slot>
            </span>
            <span
                ref="iconWrapper"
                class="block w-[12px] dark:stroke-dark-300"
                :class="{
                    '-rotate-90': !showForm,
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
