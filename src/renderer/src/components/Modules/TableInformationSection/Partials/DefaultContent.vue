<script setup lang="ts">
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import VPanelButtonIcon from '@components/Base/ButtonIcons/VPanelButtonIcon.vue';
import VPanelColumnButton from '@components/Base/Buttons/VPanelColumnButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import CopyIcon from '@components/Shared/Icons/CopyIcon.vue';
import TrashIcon from '@components/Shared/Icons/TrashIcon.vue';
import { useCanvasStore } from '@stores/Canvas';
import { computed, ref } from 'vue';

export type TColumnList = {
    name: string;
    type: string;
    keyConstraint: string;
};
const emits = defineEmits<{
    (e: 'addColumn', value: Event): void;
    (e: 'editColumn', value: number): void;
}>();
const canvasStore = useCanvasStore();
const currentActiveIndex = ref(-1);
const getColumns = computed((): Array<TColumnList> => {
    if (!canvasStore.hasActiveNode) return [];
    return canvasStore.currentActiveNode.data.table.columns.map((column) => ({
        name: column.name,
        type: column.type,
        keyConstraint: column.keyConstraint,
    }));
});
const canCloneColumn = computed((): boolean => {
    if (!canvasStore.hasActiveNode || currentActiveIndex.value === -1)
        return false;
    const ActiveNode = canvasStore.currentActiveNode;
    const CurrentColumn =
        ActiveNode.data.table.columns[currentActiveIndex.value];

    return CurrentColumn.keyConstraint !== 'PK';
});
const onClickToggleActiveState = (e: MouseEvent, ind: number) => {
    (e.target as HTMLButtonElement).blur();
    if (currentActiveIndex.value === ind) {
        currentActiveIndex.value = -1;
        return;
    }
    currentActiveIndex.value = ind;
};
const onClickDeleteColumn = () => {
    canvasStore.removeColumnInActiveNode(currentActiveIndex.value);
    currentActiveIndex.value = -1;
};
</script>
<template>
    <div>
        <VPanelTextInput
            id="columnTextInput"
            v-model="canvasStore.currentActiveNode.data.table.name"
            class="mb-4"
            placeholder="Place table's name here"
        >
            <template #label> Table's Name:</template>
        </VPanelTextInput>
        <VPanelColumnButton
            v-for="(column, ind) in getColumns"
            :key="`${column.name}${ind}`"
            class="mb-2 last-of-type:mb-0"
            :is-active="currentActiveIndex === ind"
            @click="onClickToggleActiveState($event, ind)"
            @dblclick="emits('editColumn', ind)"
        >
            <template #column>
                {{ column.name }}
            </template>
            <template #type>{{ column.type }}</template>
            <template #keyConstraint>{{ column.keyConstraint }}</template>
        </VPanelColumnButton>

        <div class="mt-2.5">
            <VPanelButtonIcon class="mr-1" @click="emits('addColumn', $event)">
                <AddIcon />
                <template #tooltip>Add Column</template>
            </VPanelButtonIcon>
            <VPanelButtonIcon
                class="mr-1"
                :disabled="!canCloneColumn"
                @click="canvasStore.cloneColumnInActiveNode(currentActiveIndex)"
            >
                <CopyIcon />
                <template #tooltip>Copy Column</template>
            </VPanelButtonIcon>
            <VPanelButtonIcon
                color-scheme="danger"
                :disabled="currentActiveIndex === -1"
                @click="onClickDeleteColumn"
            >
                <TrashIcon />
                <template #tooltip>Delete Column</template>
            </VPanelButtonIcon>
        </div>
    </div>
</template>
