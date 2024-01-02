<script setup lang="ts">
import VButtonDropdown from '@components/Base/Forms/VButtonDropdown.vue';
import VButtonDropdownItem from '@components/Base/Forms/VButtonDropdownItem.vue';
import { BackgroundVariant } from '@vue-flow/background';
import { useSettingsStore } from '@stores/Settings';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';

const settingsStore = useSettingsStore();
const dropdown: Ref<InstanceType<typeof VButtonDropdown>> = ref(null);
const getSelectedVariant = computed(() => {
    return settingsStore.backgroundVariant === 'lines' ? 'Lines' : 'Dots';
});
const onClickChangeVariant = (variant: BackgroundVariant) => {
    settingsStore.backgroundVariant = variant;
    dropdown.value.showDropdown = false;
};
</script>

<template>
    <div>
        <p class="text-sm font-bold text-slate-800 dark:text-slate-400">
            Change Background Variant:
        </p>
        <p
            class="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-500"
        >
            You can change the canvas's background variant by selecting an item
            from the dropdown menu.
        </p>
        <VButtonDropdown ref="dropdown">
            <template #label>
                {{ getSelectedVariant }}
            </template>
            <template #dropdown>
                <VButtonDropdownItem
                    @click="onClickChangeVariant(BackgroundVariant.Lines)"
                >
                    Lines
                </VButtonDropdownItem>
                <VButtonDropdownItem
                    @click="onClickChangeVariant(BackgroundVariant.Dots)"
                >
                    Dots
                </VButtonDropdownItem>
            </template>
        </VButtonDropdown>
    </div>
</template>
