<script setup lang="ts">
import BaseColumnButton from '@components/Modules/TableInformation/Partials/BaseColumnButton.vue';
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { computed, ref } from 'vue';

export type TColumnList = {
    name: string;
    type: string;
    keyConstraint: string;
};
const canvasStore = useCanvasStore();
const currentColumnIndex = ref(-1);
const getColumns = computed((): Array<TColumnList> => {
    if (!canvasStore.hasActiveNode) return [];
    return canvasStore.currentActiveNode.data.table.columns.map((column) => ({
        name: column.name,
        type: column.type,
        keyConstraint: column.keyConstraint,
    }));
});
const onClickToggleActiveState = (e: MouseEvent, ind: number) => {
    (e.target as HTMLButtonElement).blur();
    if (currentColumnIndex.value === ind) {
        currentColumnIndex.value = -1;
        return;
    }
    currentColumnIndex.value = ind;
};
</script>
<template>
    <div>
        <VPanelTextInput
            v-model="canvasStore.currentActiveNode.data.table.name"
            class="mb-4"
            id="columnTextInput"
            placeholder="Place table's name here"
        >
            <template #label> Table's Name:</template>
        </VPanelTextInput>
        <BaseColumnButton
            v-for="(column, ind) in getColumns"
            :key="`${column.name}${ind}`"
            class="mb-2 last-of-type:mb-0"
            :is-active="currentColumnIndex === ind"
            @click="onClickToggleActiveState($event, ind)"
        >
            <template #column>
                {{ column.name }}
            </template>
            <template #type>{{ column.type }}</template>
            <template #keyConstraint>{{ column.keyConstraint }}</template>
        </BaseColumnButton>
    </div>
</template>
