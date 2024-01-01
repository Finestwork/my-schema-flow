<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import QuestionMarkIcon from '@components/Shared/Icons/QuestionMarkIcon.vue';
</script>

<template>
    <VTooltip>
        <button
            type="button"
            class="h-[15px] w-[15px] rounded-full border-2 border-slate-600 stroke-slate-600 p-0.5"
        >
            <QuestionMarkIcon />
        </button>

        <template #tooltip>
            <slot name="helper"></slot>
        </template>
    </VTooltip>
</template>
