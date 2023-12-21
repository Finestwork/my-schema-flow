w
<script setup lang="ts">
import VToolbarButtonDropdown from '@components/Base/Dropdowns/VToolbarButtonDropdown.vue';
import VToolbarButtonDropdownItem from '@components/Base/Dropdowns/VToolbarButtonDropdownItem.vue';
import ExportImageIcon from '@components/Shared/Icons/ExportImageIcon.vue';
import type { TExportTypes } from '@utilities/ExportHelper';
</script>

<template>
    <VToolbarButtonDropdown ref="btn">
        <ExportImageIcon />
        <template #tooltip>Export As Image</template>
        <template #float>
            <VToolbarButtonDropdownItem>
                <template #text>Export To PNG</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem>
                <template #text>Export To JPG</template>
            </VToolbarButtonDropdownItem>
            <VToolbarButtonDropdownItem>
                <template #text>Export To SVG</template>
            </VToolbarButtonDropdownItem>
        </template>
    </VToolbarButtonDropdown>
</template>
