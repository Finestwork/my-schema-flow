import type { ComputedRef, InjectionKey } from 'vue';
import type { TEdge, TNode } from '@stores/CanvasStore';

export const getEdgesKey: InjectionKey<ComputedRef<Array<TEdge>>> =
    Symbol('getEdges');
export const getNodesKey: InjectionKey<ComputedRef<Array<TNode>>> =
    Symbol('getNodes');
