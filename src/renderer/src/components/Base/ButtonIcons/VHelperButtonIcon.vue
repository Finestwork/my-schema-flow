<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import QuestionMarkIcon from '@components/Shared/Icons/QuestionMarkIcon.vue';
</script>

<template>
    <VTooltip>
        <button
            type="button"
            class="h-[15px] w-[15px] rounded-full border-2 border-slate-600 stroke-slate-600 p-0.5 outline-none hover:border-cyan-700 hover:stroke-cyan-700 focus:border-cyan-700 focus:stroke-cyan-700 dark:border-dark-300 dark:stroke-dark-100"
        >
            <QuestionMarkIcon />
        </button>

        <template #tooltip>
            <span class="m-1.5 block text-[.75rem]">
                <slot name="helper"></slot>
            </span>
        </template>
    </VTooltip>
</template>
