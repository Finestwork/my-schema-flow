<script setup lang="ts">
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedTable.vue';
import { ref } from 'vue';

const referencingColumn = ref('');
const referencedTable = ref('');
</script>

<template>
    <div>
        <PanelFormReferencingColumn v-model="referencingColumn" class="mb-2" />
        <PanelFormReferencedColumn v-model="referencedTable" />
    </div>
</template>
