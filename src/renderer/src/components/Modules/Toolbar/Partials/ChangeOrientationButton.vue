<script setup lang="ts">
import BaseButtonDropdown from '@components/Modules/Toolbar/Partials/BaseButtonDropdown.vue';
import BaseButtonDropdownItem from '@components/Modules/Toolbar/Partials/BaseButtonDropdownItem.vue';
import HorizontalLayoutIcon from '@components/Shared/Icons/HorizontalLayoutIcon.vue';
import VerticalLayoutIcon from '@components/Shared/Icons/VerticalLayoutIcon.vue';
import ChangeOrientationIcon from '@components/Shared/Icons/ChangeOrientationIcon.vue';
import { useSettingsStore } from '@stores/SettingsStore';

const settingsStore = useSettingsStore();
const emits = defineEmits<{
    (e: 'changeOrientation'): void;
}>();
const onClickChangeOrientation = (orientation: 'TB' | 'LR') => {
    settingsStore.currentOrientation = orientation;
    emits('changeOrientation');
};
</script>

<template>
    <BaseButtonDropdown>
        <ChangeOrientationIcon />
        <template #tooltip>Change Layout Orientation</template>
        <template #float>
            <BaseButtonDropdownItem
                :is-active="settingsStore.currentOrientation === 'LR'"
                @click="onClickChangeOrientation('LR')"
            >
                <template #icon>
                    <HorizontalLayoutIcon />
                </template>
                <template #text>Horizontal Layout</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem
                :is-active="settingsStore.currentOrientation === 'TB'"
                @click="onClickChangeOrientation('TB')"
            >
                <template #icon>
                    <VerticalLayoutIcon />
                </template>
                <template #text>Vertical Layout</template>
            </BaseButtonDropdownItem>
        </template>
    </BaseButtonDropdown>
</template>
