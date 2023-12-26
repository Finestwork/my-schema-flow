import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom';
import anime from 'animejs/lib/anime.es.js';
import { toValue, ref } from 'vue';
import type { Placement } from '@floating-ui/dom';
import type { MaybeRefOrGetter, Ref } from 'vue';

export type TTooltipAnimation = {
    offset?: {
        x?: number;
        y?: number;
    };
    placement?: 'left' | 'right' | 'top' | 'bottom';
    arrow?: MaybeRefOrGetter<HTMLElement>;
};

export function useTooltipSlideUpAnimation(
    source: Ref<HTMLElement>,
    options: TTooltipAnimation | Record<string, never> = {},
) {
    const DefaultOptions = {
        offset: {
            y: 0,
            x: 0,
        },
        placement: 'bottom',
    };
    const MergedOptions = Object.assign(DefaultOptions, options);
    const currentPlacement = ref(MergedOptions.placement);

    const onEnter = (el: Element, done: () => void) => {
        const Middlewares = [
            offset({ mainAxis: MergedOptions?.offset?.y ?? 0 }),
            flip(),
            shift(),
        ];

        if ('arrow' in MergedOptions) {
            const ArrowElement = toValue(MergedOptions.arrow) as HTMLElement;

            Middlewares.push(
                arrow({
                    element: ArrowElement,
                }),
            );
        }
        computePosition(source.value, el as HTMLElement, {
            placement: MergedOptions.placement as Placement,
            middleware: Middlewares,
        }).then(({ x, y, placement, middlewareData }) => {
            const Offset = 15;
            const ArrowWidth = 6; // 6px
            const InitialTop = placement === 'top' ? y - Offset : y + Offset;
            currentPlacement.value = placement;

            // Check arrow element existence
            if ('arrow' in MergedOptions) {
                const ArrowMiddleware = middlewareData.arrow;
                if (!ArrowMiddleware) return;
                const ArrowElement = toValue(
                    MergedOptions.arrow,
                ) as HTMLElement;

                if (placement === 'top') {
                    Object.assign(ArrowElement.style, {
                        left:
                            ArrowMiddleware.x != null
                                ? `${ArrowMiddleware.x}px`
                                : '',
                        bottom: '-4.5px', // Since border-width is .3rem or 6px
                        transform: 'rotate(180deg) translateY(-50%)',
                    });
                }

                if (placement === 'bottom') {
                    Object.assign(ArrowElement.style, {
                        left:
                            ArrowMiddleware.x != null
                                ? `${ArrowMiddleware.x}px`
                                : '',
                        top: '-4.5px', // Since border-width is .3rem or 6px
                        transform: 'translateY(-50%)',
                    });
                }

                if (placement === 'right') {
                    Object.assign(ArrowElement.style, {
                        left: '-4.5px',
                        top: ArrowMiddleware.y, // Since border-width is .3rem or 6px
                        transform: 'translateX(-50%) rotate(-90deg)',
                    });
                }

                if (placement === 'left') {
                    Object.assign(ArrowElement.style, {
                        right: '-4.5px',
                        top: ArrowMiddleware.y, // Since border-width is .3rem or 6px
                        transform: 'translateX(-50%) rotate(90deg)',
                    });
                }
            }

            Object.assign((<HTMLElement>el).style, {
                left: `${x}px`,
                top: `${InitialTop}px`,
                opacity: 0,
            });

            const FinalTop =
                'arrow' in MergedOptions
                    ? placement !== 'top'
                        ? y + ArrowWidth
                        : y - ArrowWidth
                    : y;

            anime({
                targets: el,
                top: FinalTop,
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
        currentPlacement,
        onEnter,
        onLeave,
    };
}
