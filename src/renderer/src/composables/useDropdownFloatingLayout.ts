import { size, flip, shift, useFloating } from '@floating-ui/vue';
import type {
    FloatingElement,
    MaybeElement,
    ReferenceElement,
} from '@floating-ui/vue';
import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export function useDropdownFloatingLayout(
    reference: Readonly<Ref<MaybeElement<ReferenceElement>>>,
    floating: Readonly<Ref<MaybeElement<FloatingElement>>>,
) {
    const Middlewares = [
        shift(),
        flip(),
        size({
            apply({ rects, elements }) {
                // Change styles, e.g.
                Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
    ];
    const { floatingStyles, update } = useFloating(reference, floating, {
        middleware: Middlewares,
    });

    onMounted(() => {
        window.addEventListener('resize', update);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', update);
    });

    return {
        floatingStyles,
    };
}
