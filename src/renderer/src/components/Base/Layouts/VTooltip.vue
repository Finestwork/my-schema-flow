<script setup lang="ts">
import { useTooltipAnimation } from '@composables/useTooltipAnimation';
import { ref } from 'vue';

export type TTooltip = {
    offsetY?: number;
    placement?: 'top' | 'bottom' | 'left' | 'right';
};
const props = withDefaults(defineProps<TTooltip>(), {
    offsetY: 0,
    placement: 'bottom',
});
const showTooltip = ref(false);
const source = ref();
const { slideUpAnimation } = useTooltipAnimation(source, {
    offset: {
        y: props.offsetY,
    },
    placement: props.placement,
});
const { onEnter, onLeave } = slideUpAnimation();
</script>

<template>
    <div
        ref="source"
        class="inline-flex"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
    >
        <slot></slot>

        <Teleport to="body">
            <Transition @enter="onEnter" @leave="onLeave">
                <span v-if="showTooltip" class="absolute left-0 top-0 z-50">
                    <slot name="tooltip"></slot>
                </span>
            </Transition>
        </Teleport>
    </div>
</template>
