import type { NumeralThousandGroupStyles } from 'cleave-zen';
import { formatNumeral } from 'cleave-zen';

export const numberOnly = {
    numberOnly(e: Event) {
        const Target = <HTMLInputElement>e.target;
        Target.value = formatNumeral(Target.value, {
            numeralThousandsGroupStyle:
                'thousand' as NumeralThousandGroupStyles.THOUSAND,
        });
    },
    mounted(el: Element, binding) {
        el.addEventListener('input', binding.dir.numberOnly);
    },
    unmounted(el: Element, binding) {
        el.removeEventListener('input', binding.dir.numberOnly);
    },
};

export const noWhiteSpace = {
    mounted(el: HTMLInputElement, binding) {
        el.addEventListener('keydown', (e: KeyboardEvent) => {
            if (!binding.value) return;
            if (e.key.trim() === '') {
                e.preventDefault();
                return;
            }

            // Prevent copy and pastes
            const InputEl = <HTMLInputElement>e.target;
            InputEl.value = InputEl.value.trim().replaceAll(/\s/g, '');
        });
        el.addEventListener('keyup', (e: KeyboardEvent) => {
            if (!binding.value) return;

            // In case user copy and pastes
            const InputEl = <HTMLInputElement>e.target;
            InputEl.value = InputEl.value.trim().replaceAll(/\s/g, '');
        });
    },
};
