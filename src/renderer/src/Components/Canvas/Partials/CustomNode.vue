<script setup lang="ts">
import VTrashIcon from '@components/Shared/Icons/VTrashIcon.vue';
import CustomNodeHandles from '@components/Canvas/Partials/CustomNodeHandles.vue';
import BaseToolbarButtonIcon from '@components/Canvas/Partials/BaseToolbarButtonIcon.vue';
import { NodeToolbar } from '@vue-flow/node-toolbar';
import { mySqlDataTypes } from '@renderer/database/MySqlDataTypes';
import { jellyAnimation } from '@utilities/AnimateHelper';
import { useTableStore } from '@stores/TableStore';
import numeral from 'numeral';
import { computed, ref, onMounted } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { TTableData } from '@stores/TableStore';

export type TState = {
    state: {
        isActive: boolean;
    };
};
export type TProps = {
    id: string;
    data: TTableData & TState;
};
const props = defineProps<TProps>();
const tableStore = useTableStore();
const { removeNodes, getNodes } = useVueFlow();
const root = ref();
const getColumns = computed(() => {
    return props.data.table.columns.map((column) => {
        const Size = numeral(column.length).format('0a');
        const Type = column.type;
        const MySqlDataType = mySqlDataTypes.filter((dataType) => dataType.name === Type)[0];
        let formattedType = '';

        if (MySqlDataType && MySqlDataType.hasSize && Size !== '') {
            formattedType = `${Type}(${Size})`;
        } else {
            formattedType = `${Type})`;
        }

        return {
            name: column.name,
            type: formattedType,
            keyConstraint: column.keyConstraint,
        };
    });
});
const onClickDeleteNode = () => {
    const Nodes = getNodes.value;
    const Node = Nodes.find((node) => node.id === props.id);
    if (!Node) return;
    removeNodes([Node]);
};
onMounted(() => {
    if (!tableStore.isCreatingTable) return;
    jellyAnimation(root.value);
});
</script>

<template>
    <div
        ref="root"
        class="relative min-h-[150px] w-[250px] overflow-hidden rounded-lg border-2 font-jetbrains hover:cursor-pointer dark:bg-dark-800"
        :class="{
            'dark:border-blue-500/30': props.data.state.isActive,
            'dark:border-slate-700': !props.data.state.isActive,
        }"
    >
        <NodeToolbar :is-visible="props.data.state.isActive" :offset="5">
            <div class="justify-right flex">
                <BaseToolbarButtonIcon @click="onClickDeleteNode">
                    <VTrashIcon />
                    <template #tooltip>Delete Table</template>
                </BaseToolbarButtonIcon>
            </div>
        </NodeToolbar>

        <CustomNodeHandles />

        <span
            class="block py-2 text-center text-sm font-bold"
            :class="{
                'dark:bg-blue-950/30 dark:text-blue-500': props.data.state.isActive,
                'dark:bg-dark-700/50 dark:text-slate-400': !props.data.state.isActive,
            }"
            >{{ props.data.table.name }}</span
        >
        <div class="py-2">
            <div
                v-for="column in getColumns"
                :key="column.name"
                class="flex justify-between px-2 py-2 text-xs font-bold"
            >
                <span class="mr-2 w-4/12 grow truncate dark:text-slate-500">{{ column.name }}</span>
                <span class="w-4/12 grow truncate text-left dark:text-slate-600">{{
                    column.type
                }}</span>
                <span class="w-2/12 grow truncate text-center dark:text-rose-500">{{
                    column.keyConstraint
                }}</span>
            </div>
        </div>
    </div>
</template>
