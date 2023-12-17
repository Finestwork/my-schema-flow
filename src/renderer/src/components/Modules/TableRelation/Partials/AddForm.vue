<script setup lang="ts">
import AddIcon from '@components/Shared/Icons/AddIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedTable from '@components/Shared/Forms/PanelFormReferencedTable.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import { ref } from 'vue';

const emits = defineEmits<{
    (e: 'goBack'): void;
}>();
const referencingColumn = ref('');
const referencedTable = ref('');
const referencedColumn = ref('');
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
        <VPanelActionButton>
            <template #icon>
                <AddIcon />
            </template>
            <template #text>Add Relation</template>
        </VPanelActionButton>
    </div>
</template>
