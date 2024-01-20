import { vueFlowKey } from '@symbols/VueFlow';
import { inject } from 'vue';

export function usePaneDoubleClick(cb: () => void) {
    const vueFlow = inject(vueFlowKey);
    let currentDate = 0;

    if (!vueFlow) return;

    vueFlow.onPaneClick(() => {
        if (currentDate && +new Date() - currentDate < 250) {
            cb();
            currentDate = 0;
        } else {
            currentDate = +new Date();
        }
    });
}
