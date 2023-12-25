<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';
import { useSaveCanvas } from '@composables/Canvas/useSaveCanvas';

const { saveCanvas } = useSaveCanvas();
</script>
<template>
    <VTooltip>
        <button
            class="duration-750 rounded px-3 py-1.5 text-xs font-semibold outline-none transition-shadow ease-in-out dark:bg-cyan-500/90 dark:text-white dark:shadow-[0_0_13px_1px_#06b6d487] hover:dark:bg-cyan-500/80 dark:hover:shadow-[0_0_13px_1px_#06b6d447] focus:dark:bg-cyan-500/80 dark:focus:shadow-[0_0_13px_1px_#06b6d447]"
            type="button"
            @click="saveCanvas"
        >
            Save
        </button>
        <template #tooltip>
            <VTooltipKeyboardText :windows="['Ctrl', 'S']" :mac="['⌘', 'S']">
                <template #label>Save File</template>
            </VTooltipKeyboardText>
        </template>
    </VTooltip>
</template>
