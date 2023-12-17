<script setup lang="ts">
import PanelFormReferencingColumn from '@components/Shared/Forms/PanelFormReferencingColumn.vue';
import PanelFormReferencedColumn from '@components/Shared/Forms/PanelFormReferencedColumn.vue';
import { ref, inject } from 'vue';

const referencingColumn = ref('');
const referencedColumn = ref('');
const getNodes = inject('getNodes');
</script>

<template>
    <div>
        <PanelFormReferencingColumn v-model="referencingColumn" />
        <PanelFormReferencedColumn v-model="referencedColumn" />
    </div>
</template>
