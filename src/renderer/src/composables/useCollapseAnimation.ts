import anime from 'animejs/lib/anime.es.js';

export const animateIcon = (icon: Element, isActive: boolean) => {
    const Icon = icon;
    if (!isActive) {
        anime({
            targets: Icon,
            rotate: -90,
            easing: 'easeOutQuint',
            duration: 750,
        });
        return;
    }
    anime({
        targets: Icon,
        rotate: 0,
        easing: 'easeOutQuint',
        duration: 750,
    });
};

export const animateFormWrapperOnBeforeEnter = (el: Element) => {
    const FirstChild = <HTMLElement>el.firstElementChild;
    if (!FirstChild) return;

    Object.assign(FirstChild.style, {
        opacity: 0,
        transform: `scale(0.5)`,
    });

    Object.assign((<HTMLElement>el).style, {
        height: 0,
    });
};

export const animateFormWrapperOnEnter = (el: Element, done: () => void) => {
    const FirstChild = el.firstElementChild;
    if (!FirstChild) return;
    const SavedHeight = FirstChild.scrollHeight;

    const Timeline = anime.timeline({
        duration: 350,
        easing: 'easeOutQuint',
    });

    Timeline.add({
        targets: el,
        height: SavedHeight,
    });

    Timeline.add({
        targets: FirstChild,
        scale: 1,
        opacity: 1,
        complete: done,
    });
};

export const animateFormWrapperOnLeave = (el: Element, done: () => void) => {
    const FirstChild = <HTMLElement>el.firstElementChild;
    if (!FirstChild) return;
    const SavedHeight = FirstChild.offsetHeight;

    Object.assign((<HTMLElement>el).style, {
        targets: el,
        height: `${SavedHeight}px`,
    });

    const Timeline = anime.timeline({
        duration: 350,
        easing: 'easeOutQuint',
    });

    Timeline.add({
        targets: FirstChild,
        scale: 0.5,
        opacity: 0,
    });
    Timeline.add({
        targets: el,
        height: 0,
        complete: done,
    });
};
