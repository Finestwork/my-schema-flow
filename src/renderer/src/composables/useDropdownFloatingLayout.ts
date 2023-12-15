import { size, useFloating } from '@floating-ui/vue';
import type {
    FloatingElement,
    MaybeElement,
    ReferenceElement,
} from '@floating-ui/vue';
import type { Ref } from 'vue';

export function useDropdownFloatingLayout(
    reference: Readonly<Ref<MaybeElement<ReferenceElement>>>,
    floating: Readonly<Ref<MaybeElement<FloatingElement>>>,
) {
    const Middlewares = [
        size({
            apply({ rects, elements }) {
                // Change styles, e.g.
                Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                });
            },
        }),
    ];

    const { floatingStyles } = useFloating(reference, floating, {
        middleware: Middlewares,
    });

    return {
        floatingStyles,
    };
}
