import Bounce from 'bounce.js';

export const jellyAnimation = (element: HTMLElement) => {
    new Bounce()
        .scale({
            from: { x: 0.5, y: 1 },
            to: { x: 1, y: 1 },
            easing: 'bounce',
            bounces: 4,
            stiffness: 1,
        })
        .scale({
            from: { x: 1, y: 0.5 },
            to: { x: 1, y: 1 },
            easing: 'bounce',
            bounces: 6,
            stiffness: 1,
        })
        .applyTo(element, {
            remove: true,
        });
};
