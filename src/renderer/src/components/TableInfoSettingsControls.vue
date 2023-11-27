<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import IconCopy from '@components/IconCopy.vue';
import IconTrash from '@components/IconTrash.vue';
import TableInfoSettingsBaseButton from '@components/TableInfoSettingsBaseButton.vue';
</script>
<template>
    <div class="mt-3.5 flex">
        <TableInfoSettingsBaseButton class="mr-1.5">
            <IconAdd />
            <template #tooltip>Add column</template>
        </TableInfoSettingsBaseButton>
        <TableInfoSettingsBaseButton class="mr-1.5">
            <IconCopy />
            <template #tooltip>Copy column</template>
        </TableInfoSettingsBaseButton>
        <TableInfoSettingsBaseButton color-scheme="danger">
            <IconTrash />
            <template #tooltip>Delete column</template>
        </TableInfoSettingsBaseButton>
    </div>
</template>
