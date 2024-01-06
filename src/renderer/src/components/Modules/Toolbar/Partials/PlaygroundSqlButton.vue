<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import OpenFileIcon from '@components/Shared/Icons/OpenFileIcon.vue';
import { useModalStore } from '@stores/Modal'

const modalStore = useModalStore()

const sqlPlayground = () => {
    modalStore.showPlaygroundModal = !modalStore.showPlaygroundModal
};
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <OpenFileIcon />
        <template #tooltip> Import A File</template>
        <template #float>
            <VToolbarButtonDropdownItem @click="sqlPlayground">
                <template #text>SQL Playground</template>
            </VToolbarButtonDropdownItem>
        </template>
        
    </VToolbarButtonDropdown>
</template>
