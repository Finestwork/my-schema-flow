<script setup lang="ts">
import IconAdd from '@components/IconAdd.vue';
import TableInfoBaseButton from '@components/TableInfoBaseButton.vue';
</script>
<template>
    <div>
        <TableInfoBaseButton>
            <template #icon>
                <IconAdd />
            </template>
            <template #text>Add Relation</template>
        </TableInfoBaseButton>
    </div>
</template>
