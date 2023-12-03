<script setup lang="ts">
import NodeHandles from '@components/NodeHandles.vue';
import { mySqlDataTypes } from '@renderer/database/MySqlDataTypes';
import { computed } from 'vue';
import numeral from 'numeral';
import type { TTableData } from '@stores/TableStore';
import type { PropType } from 'vue';

const Props = defineProps({
    data: {
        type: Object as PropType<TTableData>,
        required: true,
    },
});
const getColumns = computed(() => {
    return Props.data.table.columns.map((column) => {
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
</script>

<template>
    <div
        class="relative min-h-[150px] w-[250px] overflow-hidden rounded-lg border-2 font-jetbrains dark:border-slate-700 dark:bg-dark-800"
    >
        <NodeHandles />
        <span
            class="block py-2 text-center text-sm font-bold dark:bg-dark-700/50 dark:text-slate-400"
            >{{ Props.data.table.name }}</span
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
