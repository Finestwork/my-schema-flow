import { computePosition, flip, size } from '@floating-ui/dom';
import type { Ref } from 'vue';
import { nextTick, toValue } from 'vue';

export const toggleDropdown = (
    source: Ref<HTMLElement> | HTMLElement,
    floatingDropdown: Ref<HTMLElement> | HTMLElement,
) => {
    const Source = toValue(source);
    const FloatingDropdown = toValue(floatingDropdown);
    const Middlewares = [
        size({
            apply({ rects }) {
                Object.assign(FloatingDropdown.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
        flip(),
    ];
    computePosition(Source, FloatingDropdown, { middleware: Middlewares }).then(
        async ({ x, y }) => {
            await nextTick();
            Object.assign(FloatingDropdown.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        },
    );
};
