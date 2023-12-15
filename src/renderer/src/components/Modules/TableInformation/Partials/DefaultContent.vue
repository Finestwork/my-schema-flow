<script setup lang="ts">
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import CopyIcon from '@components/Shared/Icons/CopyIcon.vue';
import TrashIcon from '@components/Shared/Icons/TrashIcon.vue';
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import BaseColumnButton from '@components/Modules/TableInformation/Partials/BaseColumnButton.vue';
import BaseButtonIcon from '@components/Modules/TableInformation/Partials/BaseButtonIcon.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { sortConstraintKeys } from '@utilities/TableHelper';
import { computed, ref } from 'vue';
import { klona } from 'klona';

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
const onClickCopyColumn = () => {
    canvasStore.cloneColumnInActiveNode(currentColumnIndex.value);
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

        <div class="mt-2.5">
            <BaseButtonIcon class="mr-1">
                <AddIcon />
                <template #tooltip>Add Column</template>
            </BaseButtonIcon>
            <BaseButtonIcon
                class="mr-1"
                :disabled="currentColumnIndex === -1"
                @click="onClickCopyColumn"
            >
                <CopyIcon />
                <template #tooltip>Copy Column</template>
            </BaseButtonIcon>
            <BaseButtonIcon
                color-scheme="danger"
                :disabled="currentColumnIndex === -1"
            >
                <TrashIcon />
                <template #tooltip>Delete Column</template>
            </BaseButtonIcon>
        </div>
    </div>
</template>
