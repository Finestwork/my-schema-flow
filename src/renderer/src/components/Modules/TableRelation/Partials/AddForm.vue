<script setup lang="ts">
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedTable from '@components/Shared/Forms/PanelFormReferencedTable.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import { nextTick, ref } from 'vue';
import type { TRelationFormData } from '@composables/useTableRelation';

const emits = defineEmits<{
    (e: 'goBack'): void;
    (e: 'addRelation', data: TRelationFormData): void;
}>();
const referencingColumn = ref('');
const referencedTable = ref('');
const referencedColumn = ref('');
const onClickAddRelation = async () => {
    emits('addRelation', {
        referencingColumn: referencingColumn.value,
        referencedTable: referencedTable.value,
        referencedColumn: referencedColumn.value,
    });
    await nextTick();
    referencingColumn.value = '';
    referencedTable.value = '';
    referencedColumn.value = '';
};
</script>

<template>
    <div>
        <PanelBackButton class="mb-4 mt-2" @click="emits('goBack')" />
        <PanelFormReferencingColumn v-model="referencingColumn" class="mb-2" />
        <PanelFormReferencedTable v-model="referencedTable" class="mb-2" />
        <PanelFormReferencedColumn
            v-model="referencedColumn"
            v-model:referenced-table="referencedTable"
            class="mb-5"
            :disabled="referencedTable.trim() === ''"
        />
        <VPanelActionButton @click="onClickAddRelation">
            <template #icon>
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
