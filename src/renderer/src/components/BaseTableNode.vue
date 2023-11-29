<script setup lang="ts">
import { Handle } from '@vue-flow/core';
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
        class="relative min-h-[150px] w-[250px] overflow-hidden rounded-lg border-2 border-blue-500 bg-white pt-1.5 font-jetbrains"
    >
        <span class="absolute left-0 top-0 block h-[6px] w-full bg-blue-500"> </span>
        <span class="block bg-blue-50 py-2 text-center text-sm font-bold text-blue-500">{{
            Props.data.table.name
        }}</span>
        <div class="py-2">
            <div
                class="flex justify-between px-2 py-2 text-xs font-semibold"
                v-for="column in getColumns"
            >
                <span class="w-4/12 grow truncate text-slate-500">{{ column.name }}</span>
                <span class="w-4/12 grow truncate text-left text-slate-500">{{ column.type }}</span>
                <span class="w-2/12 grow truncate text-center text-rose-500">{{
                    column.keyConstraint
                }}</span>
            </div>
        </div>
    </div>
</template>
