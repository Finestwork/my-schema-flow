<script setup lang="ts">
import ExportImageIcon from '@components/Shared/Icons/ExportImageIcon.vue';
import BaseButtonDropdown from '@components/Modules/Toolbar/Partials/BaseButtonDropdown.vue';
import BaseButtonDropdownItem from '@components/Modules/Toolbar/Partials/BaseButtonDropdownItem.vue';
</script>

<template>
    <BaseButtonDropdown>
        <ExportImageIcon />
        <template #tooltip>Export As Image</template>
        <template #float>
            <BaseButtonDropdownItem>
                <template #text>Export To PNG</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem>
                <template #text>Export To JPG</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem>
                <template #text>Export To SVG</template>
            </BaseButtonDropdownItem>
        </template>
    </BaseButtonDropdown>
</template>
