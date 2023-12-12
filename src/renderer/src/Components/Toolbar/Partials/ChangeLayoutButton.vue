<script setup lang="ts">
import BaseButtonDropdownItem from '@components/Toolbar/Partials/BaseButtonDropdownItem.vue';
import VTBLayoutIcon from '@components/Shared/Icons/VTBLayoutIcon.vue';
import VLayoutOrientationIcon from '@components/Shared/Icons/VLayoutOrientationIcon.vue';
import BaseButtonDropdown from '@components/Toolbar/Partials/BaseButtonDropdown.vue';
import VLRLayoutIcon from '@components/Shared/Icons/VLRLayoutIcon.vue';
import { useTableStore } from '@stores/TableStore';
import { useSettingsStore } from '@stores/SettingsStore';
import { useVueFlow } from '@vue-flow/core';
import { ref } from 'vue';

const tableStore = useTableStore();
const settingsStore = useSettingsStore();
const showLayoutOrientationDropdown = ref(false);

const emits = defineEmits<{
    (event: 'changeLayoutOrientation'): void;
}>();
const onClickChangeLayoutOrientation = (orientation: 'TB' | 'LR' = 'TB') => {
    showLayoutOrientationDropdown.value = false;
    settingsStore.currentNodeOrientation = orientation;
    emits('changeLayoutOrientation');
};
</script>

<template>
    <BaseButtonDropdown v-model:show-items="showLayoutOrientationDropdown">
        <VLayoutOrientationIcon />
        <template #float>
            <BaseButtonDropdownItem
                :is-active="settingsStore.currentNodeOrientation === 'TB'"
                @click="onClickChangeLayoutOrientation('TB')"
            >
                <template #icon>
                    <VTBLayoutIcon />
                </template>
                <template #text>Top to bottom</template>
            </BaseButtonDropdownItem>
            <BaseButtonDropdownItem
                :is-active="settingsStore.currentNodeOrientation === 'LR'"
                @click="onClickChangeLayoutOrientation('LR')"
            >
                <template #icon>
                    <VLRLayoutIcon />
                </template>
                <template #text>Left to right</template>
            </BaseButtonDropdownItem>
        </template>
        <template #tooltip> Change Layout Orientation</template>
    </BaseButtonDropdown>
</template>
