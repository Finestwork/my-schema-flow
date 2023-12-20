<script setup lang="ts">
import ExportImageIcon from '@components/Shared/Icons/ExportImageIcon.vue';
import BaseButtonDropdown from '@components/Modules/Toolbar/Partials/BaseButtonDropdown.vue';
import BaseButtonDropdownItem from '@components/Modules/Toolbar/Partials/BaseButtonDropdownItem.vue';
import type { TExportTypes } from '@utilities/ExportHelper';

const emits = defineEmits<{
    (e: 'exportImage', type: TExportTypes): void;
}>();
</script>

<template>
    <BaseButtonDropdown>
        <ExportImageIcon />
        <template #tooltip>Export As Image</template>
        <template #float>
            <BaseButtonDropdownItem @click="emits('exportImage', 'png')">
                <template #text>Export To PNG</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem @click="emits('exportImage', 'jpg')">
                <template #text>Export To JPG</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem @click="emits('exportImage', 'svg')">
                <template #text>Export To SVG</template>
            </BaseButtonDropdownItem>
        </template>
    </BaseButtonDropdown>
</template>
