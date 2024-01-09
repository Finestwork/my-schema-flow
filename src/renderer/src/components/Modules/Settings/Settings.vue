<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import VSettingsTabButton from '@components/Base/Buttons/VSettingsTabButton.vue';
import Appearance from '@components/Modules/Settings/Partials/Contents/Appearance/Appearance.vue';
import { useSettingsStore } from '@stores/Settings';

const settingsStore = useSettingsStore();
</script>
<template>
    <Teleport to="body">
        <VFullScreenModal
            class="px-2 py-2"
            @close-modal="settingsStore.showSettings = false"
        >
            <div class="flex h-full">
                <div
                    class="mr-4 h-full w-2/12 max-w-[220px] border-r-2 border-r-slate-300 pr-4 dark:border-r-dark-800"
                >
                    <VSettingsTabButton class="mb-2" :is-active="true"
                        >Appearance
                    </VSettingsTabButton>
                </div>
                <div class="h-full w-10/12">
                    <Appearance />
                </div>
            </div>
        </VFullScreenModal>
    </Teleport>
</template>
