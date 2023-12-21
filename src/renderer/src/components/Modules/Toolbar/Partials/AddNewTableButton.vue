<script setup lang="ts">
import TableIcon from '@components/Shared/Icons/TableIcon.vue';
import VToolbarButtonIcon from '@components/Base/ButtonIcons/VToolbarButtonIcon.vue';
import { isCreatingTableKey } from '@symbols/Canvas';
import { inject } from 'vue';

const isCreatingTable = inject(isCreatingTableKey);
</script>
<template>
    <VToolbarButtonIcon
        :is-active="isCreatingTable"
        @click="isCreatingTable = !isCreatingTable"
    >
        <TableIcon />
        <template #tooltip>Add New Table</template>
    </VToolbarButtonIcon>
</template>
