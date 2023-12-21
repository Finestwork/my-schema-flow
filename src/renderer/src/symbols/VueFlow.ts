import type { InjectionKey } from 'vue';
import type { VueFlowStore } from '@vue-flow/core';

export const vueFlowKey: InjectionKey<VueFlowStore> = Symbol('vueFlow');
