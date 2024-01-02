<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';

type TProps = {
    windows: Array<string>;
    macOs: Array<string>;
};

const props = defineProps<TProps>();
</script>
<template>
    <VTooltip>
        <button
            type="button"
            class="block aspect-square h-full rounded stroke-slate-500 p-[.3rem] outline-none hover:bg-slate-500/20 dark:hover:bg-cyan-950/50 dark:hover:stroke-cyan-500"
        >
            <slot></slot>
        </button>

        <template #tooltip>
            <VTooltipKeyboardText :windows="props.windows" :mac="props.macOs">
                <template #label>
                    <slot name="tooltipLabel"></slot>
                </template>
            </VTooltipKeyboardText>
        </template>
    </VTooltip>
</template>
