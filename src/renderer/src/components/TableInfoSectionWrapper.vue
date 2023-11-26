<script setup lang="ts">
import IconChevron from '@components/IconChevron.vue';
import { animateIcon } from '@composables/useCollapseAnimation';
import { ref } from 'vue';

const Props = defineProps({
    showForms: {
        type: Boolean,
        required: true,
    },
});
const iconWrapper = ref();
const isActive = ref(false);
const onClickToggleSettings = () => {
    isActive.value = !isActive.value;
    animateIcon(iconWrapper.value, isActive.value);
};
</script>
<template>
    <div>
        <button
            class="flex w-full items-center justify-between px-2 py-2.5 text-left dark:bg-dark-700"
            :class="{
                'dark:hover:bg-dark-700/70 dark:focus:bg-dark-700/70': Props.showForms,
                'cursor-not-allowed': !Props.showForms,
            }"
            :disabled="!Props.showForms"
            type="button"
            @click="onClickToggleSettings"
        >
            <span
                class="text-xs font-semibold"
                :class="{
                    'dark:text-dark-300': Props.showForms,
                    'cursor-not-allowed dark:text-dark-500': !Props.showForms,
                }"
                >Table Settings</span
            >
            <span
                ref="iconWrapper"
                class="block w-[12px]"
                :class="{
                    'dark:stroke-dark-300': Props.showForms,
                    'dark:stroke-dark-500': !Props.showForms,
                    '-rotate-90': !isActive,
                }"
            >
                <IconChevron />
            </span>
        </button>

        <div v-if="Props.showForms && isActive">
            <div class="mx-2 pb-4 pt-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
