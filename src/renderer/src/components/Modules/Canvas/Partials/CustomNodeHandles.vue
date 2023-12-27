<script setup lang="ts">
import { getHandleStylePositionPerLoop } from '@utilities/CanvasHelper';
import { Handle, useVueFlow } from '@vue-flow/core';
import { computed } from 'vue';
import type { PropType } from 'vue';
import type { HandleType } from '@vue-flow/core';

export type TProps = {
    nodeId: string;
};
const props = defineProps<TProps>();
const { getEdges } = useVueFlow();
const getHandles = computed(() => {
    return getEdges.value
        .filter((edge) => {
            return edge.source === props.nodeId || edge.target === props.nodeId;
        })
        .map((edge, ind, arr) => {
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
            const Position = IsSource
                ? edge.data.position.source
                : edge.data.position.target;

            return {
                id: IsSource ? edge.sourceHandle : edge.targetHandle,
                position: Position,
                type: IsSource ? 'source' : 'target',
                connectable: false,
                style: getHandleStylePositionPerLoop(Position, ind, arr),
            };
        });
});
</script>

<template>
    <Handle
        v-for="(handle, ind) in getHandles"
        :id="handle.id"
        :key="`${handle}-${ind}`"
        class="h-[12px] w-[12px] rounded-full bg-red-500"
        :type="handle.type as HandleType"
        :position="handle.position"
        :style="handle.style"
        :class="{
            '-translate-y-2/4 translate-x-2/4':
                handle.position === 'top' || handle.position === 'right',
            '-translate-x-2/4 translate-y-2/4':
                handle.position === 'bottom' || handle.position === 'left',
        }"
    />
</template>
