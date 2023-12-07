<script setup lang="ts">
import { computePosition, offset, flip, shift } from '@floating-ui/dom';
import anime from 'animejs/lib/anime.es.js';
import { ref } from 'vue';

export type TTooltip = {
    offsetY?: number;
};
const props = withDefaults(defineProps<TTooltip>(), {
    offsetY: 0,
});
const showTooltip = ref(false);
const source = ref();

const onEnter = (el: Element, done: () => void) => {
    const Middlewares = [offset({ mainAxis: props.offsetY }), flip(), shift()];
    computePosition(source.value, el as HTMLElement, { middleware: Middlewares }).then(
        ({ x, y, placement }) => {
            const InitialTop = placement === 'top' ? y - 15 : y + 15;
            Object.assign((<HTMLElement>el).style, {
                left: `${x}px`,
                top: `${InitialTop}px`,
                opacity: 0,
            });

            anime({
                targets: el,
                top: y,
                opacity: 1,
                duration: 350,
                easing: 'easeOutQuint',
                complete: done,
            });
        },
    );
};
const onLeave = (el: Element, done: () => void) => {
    const CurrentTop = el.getBoundingClientRect().top;
    anime({
        targets: el,
        top: CurrentTop,
        opacity: 0,
        duration: 350,
        easing: 'easeOutQuint',
        complete: done,
    });
};
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
                    v-if="showTooltip"
                    class="absolute left-0 top-0 rounded-lg px-2 py-2 text-xs font-semibold shadow-xl dark:bg-dark-700 dark:text-slate-300"
                >
                    <slot name="tooltip"></slot>
                </span>
            </Transition>
        </Teleport>
    </div>
</template>
