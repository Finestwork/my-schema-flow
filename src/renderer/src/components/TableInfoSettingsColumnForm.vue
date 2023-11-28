<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import TableInfoBackButton from '@components/TableInfoBackButton.vue';
import TableInfoTextInput from '@components/TableInfoTextInput.vue';
import TableInfoTextInputNumber from '@components/TableInfoTextInputNumber.vue';
import TableSettingsAutoComplete from '@components/TableSettingsAutoComplete.vue';
import TableInfoCheckbox from '@components/TableInfoCheckbox.vue';
import { mySqlDataTypes } from '@renderer/database/MySqlDataTypes';
import { addColumn } from '@composables/useTableColumn';
import { computed, ref } from 'vue';

const emits = defineEmits(['goBack']);
const columnData = ref({
    name: '',
    type: '',
    length: '',
    isNull: false,
    keyConstraint: '',
});
const mysqlDataTypesArr = computed(() => {
    return mySqlDataTypes
        .filter((type) => type.name.toLowerCase().includes(columnData.value.type.toLowerCase()))
        .map((type) => ({
            name: type.name,
            description: type.description === '' ? 'No description' : type.description,
        }));
});
</script>

<template>
    <div class="mt-4">
        <TableInfoBackButton class="mb-6" @click="emits('goBack')" />
        <TableInfoTextInput
            class="mb-4"
            id="tableSettingsColumnName"
            placeholder="Place column's name here"
            v-model="columnData.name"
        >
            <template #label>Column name:</template>
        </TableInfoTextInput>
        <TableSettingsAutoComplete
            class="mb-4"
            id="tableSettingsColumnDataType"
            placeholder="Place column's data type here"
            v-model="columnData.type"
            :items="mysqlDataTypesArr"
        >
            <template #label> Data Type:</template>
            <template #float>
                <button
                    type="button"
                    class="group flex w-full py-2 text-xs font-semibold outline-none dark:hover:bg-dark-800/70 dark:focus:bg-dark-800/70"
                    v-for="type in mysqlDataTypesArr"
                    :key="type.name"
                >
                    <span
                        class="ml-1 w-4/12 shrink-0 text-left group-hover:text-blue-500 group-focus:text-blue-500 dark:text-slate-300"
                        >{{ type.name }}</span
                    >
                    <p class="w-7/12 truncate text-left dark:text-dark-100">
                        {{ type.description }}
                    </p>
                </button>
            </template>
        </TableSettingsAutoComplete>
        <TableInfoTextInputNumber
            class="mb-4"
            id="tableSettingsColumnLength"
            placeholder="Place data size here"
            v-model="columnData.length"
        >
            <template #label>Length:</template>
        </TableInfoTextInputNumber>
        <TableInfoCheckbox id="tableSettingsColumnNull" value="isNull" v-model="columnData.isNull">
            <template #label>Null</template>
        </TableInfoCheckbox>

        <button
            class="group mt-6 flex w-full items-center justify-center rounded py-2.5 outline-none dark:bg-dark-700 dark:hover:bg-blue-600/10 dark:focus:bg-blue-600/10"
            type="button"
            @click="addColumn(columnData)"
        >
            <span class="mr-1 block w-[10px]">
                <IconAdd
                    class="group-hover:stroke-blue-500 group-focus:stroke-blue-600 dark:stroke-slate-300"
                />
            </span>
            <span
                class="text-xs font-semibold group-hover:text-blue-500 group-focus:text-blue-500 dark:text-slate-300"
                >Add Column</span
            >
        </button>
    </div>
</template>
