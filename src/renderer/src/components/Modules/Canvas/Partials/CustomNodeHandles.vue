<script setup lang="ts">
import { Handle, useVueFlow } from '@vue-flow/core';
import { computed } from 'vue';
import type { HandleType } from '@vue-flow/core';

export type TProps = {
    nodeId: string;
    isActive: boolean;
    isFaded: boolean;
};
const props = defineProps<TProps>();
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
                };
            }
            const IsSource = edge.source === props.nodeId;
            const EdgeHandle = edge?.sourceHandle ?? '';
            const TargetHandle = edge?.targetHandle ?? '';
            const Position = IsSource
                ? edge.data.position.source
                : edge.data.position.target;

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

            return {
                id: IsSource ? EdgeHandle : TargetHandle,
                position: Position,
                type: IsSource ? 'source' : 'target',
                connectable: false,
                style: PositionStyle,
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
        :class="{
            '-translate-y-2/4 translate-x-2/4':
                handle.position === 'top' || handle.position === 'right',
            '-translate-x-2/4 translate-y-2/4':
                handle.position === 'bottom' || handle.position === 'left',
            'border-slate-200 bg-slate-500 dark:border-dark-200 dark:bg-dark-600':
                !props.isActive && !props.isFaded,
            'border-cyan-50 bg-cyan-500': props.isActive && !props.isFaded,
            'border-slate-50 bg-slate-300 dark:border-dark-500 dark:bg-dark-800':
                !props.isActive && props.isFaded,
        }"
    />
</template>
