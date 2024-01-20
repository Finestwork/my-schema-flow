<script setup lang="ts">
import VSettingsDropdown from '@components/Base/Forms/VSettingsDropdown.vue';
import VSettingsDropdownItem from '@components/Base/Forms/VSettingsDropdownItem.vue';
import { useSettingsStore } from '@stores/Settings';

const settingsStore = useSettingsStore();
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
        <VSettingsDropdown
            id="backgroundVariantDropdown"
            v-model="settingsStore.backgroundVariant"
            class="max-w-[150px]"
        >
            <VSettingsDropdownItem value="lines"> Lines </VSettingsDropdownItem>
            <VSettingsDropdownItem value="dots"> Dots </VSettingsDropdownItem>
        </VSettingsDropdown>
    </div>
</template>
