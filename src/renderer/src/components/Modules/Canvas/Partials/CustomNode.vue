<script setup lang="ts">
import { formatColumnForNodeCanvas } from '@utilities/TableHelper';
import { jellyAnimation } from '@utilities/AnimateHelper';
import { computed, ref, onMounted } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { TNodeData } from '@stores/CanvasStore';

export type TProps = {
    id: string;
    data: TNodeData;
    isCreatingTable: boolean;
};
const props = defineProps<TProps>();
const { removeNodes, getNodes } = useVueFlow();
const root = ref();
const getColumns = computed(() =>
    formatColumnForNodeCanvas(props.data.table.columns),
);
const onClickDeleteNode = () => {
    const Nodes = getNodes.value;
    const Node = Nodes.find((node) => node.id === props.id);
    if (!Node) return;
    removeNodes([Node]);
};
onMounted(() => {
    if (!props.isCreatingTable) return;
    jellyAnimation(root.value);
});
</script>

<template>
    <div
        ref="root"
        class="relative min-h-[150px] w-[350px] overflow-hidden rounded-lg border-2 font-neon-mono hover:cursor-pointer"
        :class="{
            'dark:border-cyan-600 dark:bg-[#061419]': props.data.state.isActive,
            'dark:border-dark-700 dark:bg-dark-900': !props.data.state.isActive,
        }"
        :style="{
            opacity: props.data.style.opacity,
        }"
    >
        <span
            class="block py-2 text-center text-sm font-bold"
            :class="{
                'dark:bg-cyan-950/30 dark:text-cyan-500':
                    props.data.state.isActive,
                'dark:bg-dark-800 dark:text-dark-100':
                    !props.data.state.isActive,
            }"
            >{{ props.data.table.name }}</span
        >
        <div class="py-2">
            <div
                v-for="column in getColumns"
                :key="column.name"
                class="flex justify-between px-3 py-3 text-sm font-bold"
            >
                <span
                    class="mr-2 w-4/12 grow truncate"
                    :class="{
                        'dark:text-slate-400': !props.data.state.isActive,
                        'dark:text-cyan-600': props.data.state.isActive,
                    }"
                    >{{ column.name }}</span
                >
                <span
                    class="w-4/12 grow truncate text-left"
                    :class="{
                        'dark:text-dark-50': !props.data.state.isActive,
                        'dark:text-cyan-200': props.data.state.isActive,
                    }"
                    >{{ column.type }}</span
                >
                <span
                    class="w-2/12 grow truncate text-center dark:text-rose-500"
                    >{{ column.keyConstraint }}</span
                >
            </div>
        </div>
    </div>
</template>
