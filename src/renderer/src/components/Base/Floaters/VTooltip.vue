<script setup lang="ts">
import { useTooltipSlideUpAnimation } from '@composables/Animations/useTooltipSlideUpAnimation';
import { ref } from 'vue';

export type TTooltip = {
    offsetY?: number;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    canShowTooltip?: boolean;
};
const props = withDefaults(defineProps<TTooltip>(), {
    offsetY: 0,
    placement: 'bottom',
    canShowTooltip: true,
});
const arrowEl = ref();
const source = ref();
const showTooltip = ref(false);
const { onEnter, onLeave, currentPlacement } = useTooltipSlideUpAnimation(
    source,
    {
        offset: {
            y: props.offsetY,
        },
        placement: props.placement,
        arrow: arrowEl,
    },
);
const onMouseEnterShowTooltip = () => {
    if (props.canShowTooltip) {
        showTooltip.value = true;
    }
};
defineExpose({
    showTooltip,
});
</script>

<template>
    <div
        ref="source"
        class="inline-flex"
        @mouseenter="onMouseEnterShowTooltip"
        @mouseleave="showTooltip = false"
    >
        <slot></slot>

        <Teleport to="body">
            <Transition @enter="onEnter" @leave="onLeave">
                <div
                    v-if="showTooltip"
                    class="absolute z-50 max-w-[350px] break-words rounded bg-white p-1.5 text-[.6rem] font-semibold text-slate-500 dark:bg-dark-700 dark:text-white"
                    :class="{
                        'shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.16)] dark:shadow-[inset_0_-4px_0_0_rgba(15,18,26,0.3)]':
                            currentPlacement !== 'top',
                    }"
                >
                    <span
                        ref="arrowEl"
                        class="absolute block border-[.3rem] border-transparent border-b-white dark:border-b-dark-700"
                    ></span>
                    <slot name="tooltip"></slot>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
