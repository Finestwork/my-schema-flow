import { computePosition, offset, flip, shift } from '@floating-ui/dom';
import anime from 'animejs/lib/anime.es.js';
import type { Ref } from 'vue';

export type TTooltipAnimation = {
    offset?: {
        x?: number;
        y?: number;
    };
    placement?: 'left' | 'right' | 'top' | 'bottom';
};
const DefaultOptions = {
    offset: {
        y: 0,
        x: 0,
    },
    placement: 'bottom',
};

export function useTooltipAnimation(
    source: Ref<HTMLElement>,
    options: TTooltipAnimation = DefaultOptions,
) {
    const slideUpAnimation = () => {
        const onEnter = (el: Element, done: () => void) => {
            const Middlewares = [offset({ mainAxis: options?.offset?.y ?? 0 }), flip(), shift()];
            computePosition(source.value, el as HTMLElement, {
                placement: options.placement,
                middleware: Middlewares,
            }).then(({ x, y, placement }) => {
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

        return {
            onEnter,
            onLeave,
        };
    };

    return {
        slideUpAnimation,
    };
}
