<script setup lang="ts">
import VChevronIcon from '@components/Shared/Icons/VChevronIcon.vue';
import { ref } from 'vue';
import anime from 'animejs/lib/anime.es';

const { showForm } = defineModels<{
    showForm: boolean;
}>();
const iconWrapper = ref();
const onClickToggleSettings = () => {
    showForm.value = !showForm.value;
    if (!showForm.value) {
        anime({
            targets: iconWrapper.value,
            rotate: -90,
            easing: 'easeOutQuint',
            duration: 750,
        });
        return;
    }
    anime({
        targets: iconWrapper.value,
        rotate: 0,
        easing: 'easeOutQuint',
        duration: 750,
    });
};
</script>
<template>
    <div>
        <button
            class="flex w-full items-center justify-between px-2 py-2.5 text-left outline-none dark:bg-dark-700 dark:hover:bg-dark-700/70 dark:focus:bg-dark-700/70"
            type="button"
            :class="{ 'border-b-[1px] dark:border-dark-600': !showForm }"
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
                <VChevronIcon />
            </span>
        </button>

        <div v-if="showForm">
            <div class="mx-2 pb-4 pt-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
