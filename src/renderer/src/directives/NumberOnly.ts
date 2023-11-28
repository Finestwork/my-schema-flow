import { formatNumeral } from 'cleave-zen';
import type { NumeralThousandGroupStyles } from 'cleave-zen';
import type { DirectiveBinding } from 'vue';

type TBind = DirectiveBinding & { dir: { numberOnly(): void } };
export const NumberOnly = {
    numberOnly(e: Event) {
        const Target = <HTMLInputElement>e.target;
        Target.value = formatNumeral(Target.value, {
            numeralThousandsGroupStyle: 'thousand' as NumeralThousandGroupStyles.THOUSAND,
        });
    },
    mounted(el: Element, binding: TBind) {
        el.addEventListener('input', binding.dir.numberOnly);
    },
    unmounted(el: Element, binding: TBind) {
        el.removeEventListener('input', binding.dir.numberOnly);
    },
};
