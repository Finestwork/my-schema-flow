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
const { onEnter, onLeave } = useTooltipSlideUpAnimation(source, {
    offset: {
        y: props.offsetY,
    },
    placement: props.placement,
    arrow: arrowEl,
});
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
                    class="absolute z-50 rounded p-1.5 text-[.6rem] font-semibold shadow-xl dark:bg-dark-700 dark:text-white dark:shadow-[inset_0_-4px_0_0_rgba(15,18,26,0.3)]"
                >
                    <span
                        ref="arrowEl"
                        class="absolute block border-[.3rem] border-transparent dark:border-b-dark-700"
                    ></span>
                    <slot name="tooltip"></slot>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
