<script setup lang="ts">
import TestConnectionForm from '@components/Modules/Playground/Partials/DatabaseConnection/Partials/TestConnectionForm.vue';
import CreateDatabaseForm from '@components/Modules/Playground/Partials/DatabaseConnection/Partials/CreateDatabaseForm.vue';
import { usePlaygroundStore } from '@stores/Playground';

const playgroundStore = usePlaygroundStore();
</script>
<template>
    <div class="h-[calc(100%-25px-1rem)]">
        <TestConnectionForm v-if="playgroundStore.connection === null" />
        <CreateDatabaseForm v-else />
    </div>
</template>
