<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js';
import { ref } from 'vue';
import { computePosition } from '@floating-ui/dom';

const showTooltip = ref(false);
const source = ref();

const onEnter = (el: Element, done: () => void) => {
    computePosition(source.value, el as HTMLElement).then(({ x, y }) => {
        Object.assign((<HTMLElement>el).style, {
            left: `${x}px`,
            top: `${y + 15}px`,
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
    });
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
    <div ref="source" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
        <slot></slot>

        <Teleport to="body">
            <Transition @enter="onEnter" @leave="onLeave">
                <span
                    class="absolute left-0 top-0 rounded-lg px-2 py-2 text-xs font-semibold shadow-xl dark:bg-dark-700 dark:text-slate-300"
                    v-if="showTooltip"
                >
                    <slot name="tooltip"></slot>
                </span>
            </Transition>
        </Teleport>
    </div>
</template>
<script setup lang="ts"></script>
