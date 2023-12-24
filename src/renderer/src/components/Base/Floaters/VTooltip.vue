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
                <span
                    v-if="showTooltip"
                    class="absolute z-50 rounded p-1.5 text-[.6rem] font-semibold shadow-xl dark:bg-dark-800 dark:text-white"
                >
                    <span
                        ref="arrowEl"
                        class="absolute block border-[.3rem] border-transparent dark:border-b-dark-800"
                    ></span>
                    <slot name="tooltip"></slot>
                </span>
            </Transition>
        </Teleport>
    </div>
</template>
