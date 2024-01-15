<script setup lang="ts">
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import AddIcon from '@components/Shared/Icons/AddIcon.vue';

const emits = defineEmits<{
    (e: 'add-form'): void;
}>();
</script>

<template>
    <div>
        <VPanelActionButton @click="emits('add-form')">
            <template #icon>
                <AddIcon />
            </template>
            <template #text>Add Indexes</template>
        </VPanelActionButton>
    </div>
</template>
