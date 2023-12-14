<script setup lang="ts">
import VPanelSectionWrapper from '@components/Base/Layouts/VPanelSectionWrapper.vue';
import VPanelTextInput from '@components/Base/Forms/VPanelTextInput.vue';
import BaseColumnButton from '@components/Modules/TableInformation/Partials/BaseColumnButton.vue';
import { useCanvasStore } from '@stores/CanvasStore';
import { computed } from 'vue';

export type TColumnList = {
    name: string;
    type: string;
    keyConstraint: string;
};
const canvasStore = useCanvasStore();
const getColumns = computed((): Array<TColumnList> => {
    if (!canvasStore.hasActiveNode) return [];
    return canvasStore.currentActiveNode.data.table.columns.map((column) => ({
        name: column.name,
        type: column.type,
        keyConstraint: column.keyConstraint,
    }));
});
</script>
<template>
    <VPanelSectionWrapper>
        <template #label>Table Information</template>
        <template #content>
            <div class="mt-2.5">
                <div v-if="canvasStore.hasActiveNode">
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
                    >
                        <template #column>
                            {{ column.name }}
                        </template>
                        <template #type>{{ column.type }}</template>
                        <template #keyConstraint
                            >{{ column.keyConstraint }}
                        </template>
                    </BaseColumnButton>
                </div>
            </div>
        </template>
    </VPanelSectionWrapper>
</template>
