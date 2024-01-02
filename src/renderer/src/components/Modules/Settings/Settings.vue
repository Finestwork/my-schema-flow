<script setup lang="ts">
import VFullScreenModal from '@components/Base/Modals/VFullScreenModal.vue';
import VSettingsTabButton from '@components/Base/Buttons/VSettingsTabButton.vue';
import AppearanceContent from '@components/Modules/Settings/Partials/Contents/AppearanceContent.vue';
import { useSettingsStore } from '@stores/Settings';

const settingsStore = useSettingsStore();
</script>
<template>
    <Teleport to="body">
        <VFullScreenModal @close-modal="settingsStore.showSettings = false">
            <div class="flex h-full">
                <div
                    class="mr-4 h-full w-2/12 max-w-[220px] border-r-2 border-r-slate-300 pr-4"
                >
                    <VSettingsTabButton class="mb-2" :is-active="true"
                        >Appearance
                    </VSettingsTabButton>
                </div>
                <div class="h-full w-10/12">
                    <AppearanceContent />
                </div>
            </div>
        </VFullScreenModal>
    </Teleport>
</template>
