<script setup lang="ts">
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import { getNodesKey } from '@symbols/Canvas';
import { ref, inject } from 'vue';

const referencingColumn = ref('');
const referencedColumn = ref('');
</script>

<template>
    <div>
        <PanelFormReferencingColumn v-model="referencingColumn" class="mb-2" />
        <PanelFormReferencedColumn v-model="referencedColumn" />
    </div>
</template>
