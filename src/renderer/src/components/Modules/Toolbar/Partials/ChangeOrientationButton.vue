<script setup lang="ts">
import BaseButtonDropdown from '@components/Modules/Toolbar/Partials/BaseButtonDropdown.vue';
import BaseButtonDropdownItem from '@components/Modules/Toolbar/Partials/BaseButtonDropdownItem.vue';
import HorizontalLayoutIcon from '@components/Shared/Icons/HorizontalLayoutIcon.vue';
import VerticalLayoutIcon from '@components/Shared/Icons/VerticalLayoutIcon.vue';
import ChangeOrientationIcon from '@components/Shared/Icons/ChangeOrientationIcon.vue';
</script>

<template>
    <BaseButtonDropdown>
        <ChangeOrientationIcon />
        <template #tooltip>Change Layout Orientation</template>
        <template #float>
            <BaseButtonDropdownItem>
                <template #icon>
                    <HorizontalLayoutIcon />
                </template>
                <template #text>Horizontal Layout</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem>
                <template #icon>
                    <VerticalLayoutIcon />
                </template>
                <template #text>Vertical Layout</template>
            </BaseButtonDropdownItem>
        </template>
    </BaseButtonDropdown>
</template>
