<script setup lang="ts">
import { useCanvasStore } from '@stores/Canvas';
import { Handle, useVueFlow } from '@vue-flow/core';
import { computed } from 'vue';
import type { HandleType } from '@vue-flow/core';

export type TProps = {
    nodeId: string;
    isFaded: boolean;
};
const props = defineProps<TProps>();
const canvasStore = useCanvasStore();
const { getEdges } = useVueFlow();
const getHandles = computed(() => {
    const PositionTracker: Array<string> = [];
    return getEdges.value
        .filter((edge) => {
            return edge.source === props.nodeId || edge.target === props.nodeId;
        })
        .map((edge, _, arr) => {
            if (!('position' in edge.data)) {
                return {
                    id: '',
                    position: '',
                    type: '',
                    connectable: false,
                    style: {},
                    isHandleActive: false,
                };
            }

            const IsSource = edge.source === props.nodeId;
            const SourceHandle = edge?.sourceHandle ?? '';
            const TargetHandle = edge?.targetHandle ?? '';
            const EdgeId = IsSource ? SourceHandle : TargetHandle;
            const Position = IsSource
                ? edge.data.position.source
                : edge.data.position.target;
            const IsTheSameNode = EdgeId.includes(
                canvasStore.currentActiveNode.id,
            );
            const IsHandleActive = IsSource
                ? edge.data.referenced.isHandleActive
                : edge.data.referencing.isHandleActive;

            const MiddlePlace = 50;
            const CoordsSpaceStep = MiddlePlace / arr.length;
            const CurrentPosLength = PositionTracker.filter(
                (pos) => pos === Position,
            ).length;
            const IsEven = CurrentPosLength % 2 === 0;
            const CurrentSpace =
                MiddlePlace - CoordsSpaceStep * CurrentPosLength;
            const CalculatedPosition = IsEven
                ? CurrentSpace
                : MiddlePlace + CurrentSpace;
            const positionInPercentage = `${CalculatedPosition}%`;
            const positionX =
                Position === 'top' || Position === 'bottom' ? 'left' : 'top';
            const PositionStyle = {
                [Position]: 0,
                [positionX]: positionInPercentage,
            };
            PositionTracker.push(Position);

            const Cardinality =
                edge.data.cardinality === 'one-to-one'
                    ? {
                          source: '1',
                          target: '1',
                      }
                    : edge.data.cardinality === 'one-to-many'
                      ? {
                            source: '1',
                            target: '*',
                        }
                      : edge.data.cardinality === 'many-to-one'
                        ? { source: '*', target: '1' }
                        : {
                              source: '*',
                              target: '*',
                          };

            return {
                id: EdgeId,
                position: Position,
                type: IsSource ? 'source' : 'target',
                connectable: false,
                style: PositionStyle,
                isHandleActive: IsTheSameNode && IsHandleActive,
                cardinalityLabel: IsSource
                    ? Cardinality.source
                    : Cardinality.target,
            };
        });
});
</script>

<template>
    <Handle
        v-for="(handle, ind) in getHandles"
        :id="handle.id"
        :key="`${handle}-${ind}`"
        class="h-[12px] w-[12px] rounded-full border-2"
        :type="handle.type as HandleType"
        :position="handle.position"
        :style="handle.style"
        :connectable="handle.connectable"
        :class="{
            '-translate-y-2/4 translate-x-2/4':
                handle.position === 'top' || handle.position === 'right',
            '-translate-x-2/4 translate-y-2/4':
                handle.position === 'bottom' || handle.position === 'left',
            'border-slate-200 bg-slate-500 dark:border-dark-200 dark:bg-dark-600':
                !handle.isHandleActive && !props.isFaded,
            'border-cyan-50 bg-cyan-500':
                handle.isHandleActive && !props.isFaded,
            'border-slate-50 bg-slate-300 dark:border-dark-500 dark:bg-dark-800':
                !handle.isHandleActive && props.isFaded,
        }"
    >
        <span
            v-if="handle.isHandleActive && !props.isFaded"
            class="text-md block font-bold text-slate-950 dark:text-dark-50"
            :class="{
                '-translate-y-[20px] translate-x-[12px]':
                    handle.position === 'top' || handle.position === 'right',
                '-translate-x-[12px] translate-y-[20px]':
                    handle.position === 'bottom' || handle.position === 'left',
            }"
            >{{ handle.cardinalityLabel }}</span
        >
    </Handle>
</template>
