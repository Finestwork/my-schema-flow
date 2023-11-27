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
        </TableInfoSettingsBaseButton>
        <TableInfoSettingsBaseButton class="mr-1.5">
            <IconCopy />
        </TableInfoSettingsBaseButton>
        <TableInfoSettingsBaseButton color-scheme="danger">
            <IconTrash />
        </TableInfoSettingsBaseButton>
    </div>
</template>
