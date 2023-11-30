import { computePosition, size, flip } from '@floating-ui/dom';
import type { Ref } from 'vue';
import { nextTick } from 'vue';

export const toggleDropdown = (source: Ref<HTMLElement>, floatingDropdown: Ref<HTMLElement>) => {
    const Middlewares = [
        size({
            apply({ rects }) {
                Object.assign(floatingDropdown.value.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
        flip(),
    ];
    computePosition(source.value, floatingDropdown.value, { middleware: Middlewares }).then(
        async ({ x, y }) => {
            await nextTick();
            Object.assign(floatingDropdown.value.style, {
                top: `${y}px`,
                left: `${x}px`,
            });
        },
    );
};
