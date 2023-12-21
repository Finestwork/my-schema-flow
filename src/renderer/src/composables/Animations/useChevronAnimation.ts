import { toValue } from 'vue';
import anime from 'animejs';
import type { MaybeRefOrGetter } from 'vue';

export function useChevronAnimation(el: MaybeRefOrGetter) {
    const animateActiveState = () => {
        const element = toValue(el);
        return anime({
            targets: element,
            duration: 150,
            easing: 'easeInOutSine',
            rotate: '0deg',
        });
    };
    const animateInactiveState = () => {
        const element = toValue(el);
        return anime({
            targets: element,
            duration: 150,
            easing: 'easeInOutSine',
            rotate: '-90deg',
        });
    };

    return {
        animateActiveState,
        animateInactiveState,
    };
}
