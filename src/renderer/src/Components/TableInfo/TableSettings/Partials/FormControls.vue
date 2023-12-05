<script setup lang="ts">
import IconAdd from '@components/Shared/Icons/VAddIcon.vue';
import VCopyIcon from '@components/Shared/Icons/VCopyIcon.vue';
import VTrashIcon from '@components/Shared/Icons/VTrashIcon.vue';
import BaseButtonIcon from '@components/TableInfo/Shared/BaseButtonIcon.vue';
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
        <BaseButtonIcon class="mr-1.5" @click="emits('addColumn')">
            <IconAdd />
            <template #tooltip>Add column</template>
        </BaseButtonIcon>
        <BaseButtonIcon
            class="mr-1.5"
            :disabled="!TableStore.activeNodeHasColumns || !canClone"
            @click="emits('copyColumn', $event)"
        >
            <VCopyIcon />
            <template #tooltip>Copy column</template>
        </BaseButtonIcon>
        <BaseButtonIcon
            color-scheme="danger"
            :disabled="!TableStore.activeNodeHasColumns || !canDelete"
            @click="emits('deleteColumn')"
        >
            <VTrashIcon />
            <template #tooltip>Delete column</template>
        </BaseButtonIcon>
    </div>
</template>
