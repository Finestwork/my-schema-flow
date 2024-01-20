import type { InjectionKey, Ref } from 'vue';

export const isCreatingTableKey: InjectionKey<Ref<boolean>> =
    Symbol('isCreatingTable');
