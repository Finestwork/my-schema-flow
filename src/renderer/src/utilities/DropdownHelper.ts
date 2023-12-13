import { computePosition, flip, size } from '@floating-ui/dom';
import { nextTick } from 'vue';

export function toggleDropdown(
    source: HTMLElement,
    floatingDropdown: HTMLElement,
) {
    const Middlewares = [
        size({
            apply({ rects }) {
                Object.assign(floatingDropdown.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
        flip(),
    ];
    computePosition(source, floatingDropdown, { middleware: Middlewares }).then(
        async ({ x, y }) => {
            await nextTick();
            Object.assign(floatingDropdown.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        },
    );
}
