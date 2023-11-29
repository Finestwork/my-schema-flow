<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import IconCopy from '@components/IconCopy.vue';
import IconTrash from '@components/IconTrash.vue';
import TableInfoSettingsBaseButton from '@components/TableInfoSettingsBaseButton.vue';
import { useTableStore } from '@stores/TableStore';

const TableStore = useTableStore();
const { canClone, canDelete } = defineProps<{
    canClone: boolean;
    canDelete: boolean;
}>();
const emits = defineEmits<{
    (e: 'addColumn'): void;
    (e: 'copyColumn', payload: Event): void;
    (e: 'deleteColumn'): void;
}>();
</script>
<template>
    <div class="mt-3.5 flex">
        <TableInfoSettingsBaseButton class="mr-1.5" @click="emits('addColumn')">
            <IconAdd />
            <template #tooltip>Add column</template>
        </TableInfoSettingsBaseButton>
        <TableInfoSettingsBaseButton
            class="mr-1.5"
            :disabled="!TableStore.activeNodeHasColumns || !canClone"
            @click="emits('copyColumn', $event)"
        >
            <IconCopy />
            <template #tooltip>Copy column</template>
        </TableInfoSettingsBaseButton>
        <TableInfoSettingsBaseButton
            color-scheme="danger"
            :disabled="!TableStore.activeNodeHasColumns || !canDelete"
            @click="emits('deleteColumn')"
        >
            <IconTrash />
            <template #tooltip>Delete column</template>
        </TableInfoSettingsBaseButton>
    </div>
</template>
