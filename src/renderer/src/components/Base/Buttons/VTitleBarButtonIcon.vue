<script setup lang="ts">
import VTooltip from '@components/Base/Floaters/VTooltip.vue';
import VTooltipKeyboardText from '@components/Base/Texts/VTooltipKeyboardText.vue';

type TProps = {
    windows: Array<string>;
    macOs: Array<string>;
    isActive?: boolean;
};

const props = withDefaults(defineProps<TProps>(), {
    isActive: false,
});
</script>
<template>
    <VTooltip>
        <button
            type="button"
            class="block h-full w-full rounded p-[.3rem] outline-none"
            :class="{
                'stroke-slate-500 hover:bg-slate-500/20 dark:hover:bg-cyan-950/50 dark:hover:stroke-cyan-500':
                    !props.isActive,
                'bg-cyan-600 stroke-cyan-50 dark:bg-cyan-900/50 dark:stroke-cyan-600':
                    props.isActive,
            }"
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
