<script setup lang="ts">
import VAlert from '@components/Base/Alerts/VAlert.vue';
import VPlaygroundTextInput from '@components/Base/Forms/VPlaygroundTextInput.vue';
import VUniversalButton from '@components/Base/Buttons/VUniversalButton.vue';
import CircleLoader from '@components/Base/Loaders/CircleLoader.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { nextTick, reactive, ref } from 'vue';

const playgroundStore = usePlaygroundStore();
const isConnectingToDatabase = ref(false);
const error = ref('');
const connection = reactive({
    host: '',
    port: '',
    user: '',
    password: '',
});

const connectMySQL = async () => {
    if (isConnectingToDatabase.value) return;

    error.value = '';
    isConnectingToDatabase.value = true;
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    const Result = await window.api.connectMySQL(Object.assign({}, connection));

    if (Result.error !== null) {
        error.value = Result.error.message;
        isConnectingToDatabase.value = false;
        return;
    }

    if ('databases' in Result) {
        const StoredDatabases = Result.databases[0];
        playgroundStore.storedDatabases = StoredDatabases.map(
            (db) => Object.values(db)[0],
        );
    }

    await nextTick();
    playgroundStore.connection = Object.assign({}, connection);
    isConnectingToDatabase.value = false;
};
</script>

<template>
    <div class="relative flex h-full w-full items-center">
        <div class="mx-auto w-full max-w-[350px]">
            <span class="mb-4 block text-center text-xs font-bold text-cyan-950"
                >Let's first get connected to our database!</span
            >
            <VAlert v-if="error !== ''" type="danger" class="my-4">
                {{ error }}
            </VAlert>
            <div class="mb-2 flex">
                <VPlaygroundTextInput
                    id="pgHostTxtInput"
                    v-model="connection.host"
                    placeholder="Host"
                    class="mr-2 h-full"
                    @keydown.enter="connectMySQL"
                >
                    <template #label>Host:</template>
                </VPlaygroundTextInput>
                <VPlaygroundTextInput
                    id="pgPortTxtInput"
                    v-model="connection.port"
                    placeholder="Port"
                    class="h-full"
                    @keydown.enter="connectMySQL"
                >
                    <template #label>Port:</template>
                </VPlaygroundTextInput>
            </div>
            <VPlaygroundTextInput
                id="pgUserTxtInput"
                v-model="connection.user"
                placeholder="User"
                class="mb-2"
                @keydown.enter="connectMySQL"
            >
                <template #label>User:</template>
            </VPlaygroundTextInput>
            <VPlaygroundTextInput
                id="pgPasswordTxtInput"
                v-model="connection.password"
                type="password"
                placeholder="Password"
                class="mb-2"
                @keydown.enter="connectMySQL"
            >
                <template #label>Password:</template>
            </VPlaygroundTextInput>
            <VUniversalButton @click="connectMySQL">
                <template #text>
                    <CircleLoader
                        v-if="isConnectingToDatabase"
                        class="loader w-[15px]"
                    />
                    <span v-else>Connect</span>
                </template>
            </VUniversalButton>
        </div>
        <p
            class="absolute bottom-3 w-full text-center text-[.8rem] font-bold text-slate-900 dark:text-slate-400"
        >
            Please be noted that
            <span
                class="border-b-2 border-dashed border-b-cyan-600 text-cyan-600"
                >we currently support MySQL only</span
            >, but we are working on supporting other databases. Thank you.
        </p>
    </div>
</template>

<style scoped>
.loader :deep(path) {
    stroke: white;
    fill: white;
}
</style>
