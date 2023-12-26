<script setup lang="ts">
import ChevronIcon from '@components/Shared/Icons/ChevronIcon.vue';
import { useChevronAnimation } from '@composables/Animations/useChevronAnimation';
import { ref } from 'vue';

const toggleContent = ref(true);
const chevron = ref();
const { animateInactiveState, animateActiveState } =
    useChevronAnimation(chevron);
const onClickToggleSection = (e: MouseEvent) => {
    (e.target as HTMLButtonElement).blur();
    toggleContent.value = !toggleContent.value;
    if (toggleContent.value) {
        animateActiveState();
        return;
    }
    animateInactiveState();
};
</script>
<template>
    <div>
        <button
            class="group flex w-full items-center justify-between bg-slate-400/30 px-2 py-2.5 outline-none hover:bg-slate-400/40 focus:bg-slate-400/40 dark:bg-dark-800/80 hover:dark:bg-cyan-950/20 focus:dark:bg-cyan-950/20"
            type="button"
            :class="{
                'border-b-2 border-b-slate-400 dark:border-b-dark-700 hover:dark:border-b-cyan-900 focus:dark:border-b-cyan-900':
                    !toggleContent,
            }"
            @click="onClickToggleSection"
        >
            <span
                class="text-xs font-semibold text-slate-500 dark:text-slate-500 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
            >
                <slot name="label"></slot>
            </span>
            <span
                ref="chevron"
                class="block w-[12px] stroke-slate-500 dark:stroke-slate-500 group-hover:dark:stroke-cyan-500 group-focus:dark:stroke-cyan-500"
            >
                <ChevronIcon />
            </span>
        </button>

        <div v-if="toggleContent" class="px-2 py-2.5">
            <slot name="content"></slot>
        </div>
    </div>
</template>
