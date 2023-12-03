import { formatNumeral } from 'cleave-zen';
import type { NumeralThousandGroupStyles } from 'cleave-zen';

export const NumberOnly = {
    numberOnly(e: Event) {
        const Target = <HTMLInputElement>e.target;
        Target.value = formatNumeral(Target.value, {
            numeralThousandsGroupStyle: 'thousand' as NumeralThousandGroupStyles.THOUSAND,
        });
    },
    mounted(el: Element, binding) {
        el.addEventListener('input', binding.dir.numberOnly);
    },
    unmounted(el: Element, binding) {
        el.removeEventListener('input', binding.dir.numberOnly);
    },
};
