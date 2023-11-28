import { computePosition, size } from '@floating-ui/dom';
import type { Ref } from 'vue';

export const toggleDropdown = (source: Ref<HTMLElement>, floatingDropdown: Ref<HTMLElement>) => {
    const Middlewares = [
        size({
            apply({ rects }) {
                Object.assign(floatingDropdown.value.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
    ];
    computePosition(source.value, floatingDropdown.value, { middleware: Middlewares }).then(
        ({ x, y }) => {
            Object.assign(floatingDropdown.value.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        },
    );
};
