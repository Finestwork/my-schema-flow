<script setup lang="ts">
import { useTooltipSlideUpAnimation } from '@composables/Animations/useTooltipSlideUpAnimation';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { nextTick, ref, watch } from 'vue';

export type TTooltip = {
    show?: boolean;
    offsetY?: number;
    placement?: 'top' | 'bottom' | 'left' | 'right';
};
const props = withDefaults(defineProps<TTooltip>(), {
    offsetY: 0,
    placement: 'bottom',
});
const source = ref();
const float = ref();
const { activate, deactivate } = useFocusTrap(float, {
    allowOutsideClick: true,
    returnFocusOnDeactivate: false,
});
const { onEnter, onLeave } = useTooltipSlideUpAnimation(source, {
    offset: {
        y: props.offsetY,
    },
    placement: props.placement,
});

watch(
    () => props.show,
    async (show) => {
        await nextTick();
        if (show) activate();
        else deactivate();
    },
    { flush: 'post' },
);
</script>

<template>
    <div ref="source" class="inline-flex">
        <slot></slot>

        <Teleport to="body">
            <Transition @enter="onEnter" @leave="onLeave">
                <div
                    v-if="show"
                    ref="float"
                    class="absolute z-50 overflow-hidden rounded font-semibold shadow-xl dark:bg-dark-800"
                >
                    <slot name="float"></slot>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
