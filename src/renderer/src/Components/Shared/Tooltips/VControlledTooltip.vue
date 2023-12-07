<script setup lang="ts">
import { useTooltipAnimation } from '@composables/useTooltipAnimation';
import { ref } from 'vue';

export type TTooltip = {
    shouldShowTooltip?: boolean;
    offsetY?: number;
};
const props = withDefaults(defineProps<TTooltip>(), {
    shouldShowTooltip: true,
    offsetY: 0,
});
const showTooltip = ref(false);
const source = ref();
const { slideUpAnimation } = useTooltipAnimation(source, {
    offset: {
        y: props.offsetY,
    },
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
                <span
                    v-if="showTooltip && shouldShowTooltip"
                    class="absolute left-0 top-0 rounded-lg px-2 py-2 text-xs font-semibold shadow-xl dark:bg-dark-700 dark:text-slate-300"
                >
                    <slot name="tooltip"></slot>
                </span>
            </Transition>
        </Teleport>
    </div>
</template>
