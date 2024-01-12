<script setup lang="ts">
import VUniversalButton from '@components/Base/Buttons/VUniversalButton.vue';
import VPlaygroundTextInput from '@components/Base/Forms/VPlaygroundTextInput.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import CircleLoader from '@components/Base/Loaders/CircleLoader.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { reactive, ref } from 'vue';
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';

const playgroundStore = usePlaygroundStore();
const isConnectingToDatabase = ref(false);
const isCreatingDatabase = ref(false);
const error = ref('');
const database = ref('');
const connection = reactive({
    host: '',
    port: '',
    user: '',
    password: '',
});

const connectMySQL = async () => {
    error.value = '';
    isConnectingToDatabase.value = true;
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    const Result = await window.api.connectMySQL(Object.assign({}, connection));

    if (Result.error !== null) {
        error.value = Result.error.message;
        isConnectingToDatabase.value = false;
        return;
    }

    playgroundStore.connection = Object.assign({}, connection);
    isConnectingToDatabase.value = false;
};
const createDatabase = async () => {
    isCreatingDatabase.value = true;

    const Options = Object.assign(
        {
            database: database.value,
        },
        connection,
    );

    await new Promise((resolve) => setTimeout(() => resolve(), 450));
    const Result = await window.api.createDatabase(Options);
    isCreatingDatabase.value = false;

    if (Result.error !== null) {
        error.value = Result.error.message;
    } else {
        playgroundStore.database = database.value;
    }
};
</script>
<template>
    <div class="h-[calc(100%-25px-1rem)]">
        <div
            v-if="playgroundStore.connection === null"
            class="relative flex h-full w-full items-center"
        >
            <div class="mx-auto w-full max-w-[350px]">
                <span
                    class="mb-4 block text-center text-xs font-bold text-cyan-950"
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
                class="absolute bottom-3 w-full text-center text-[.6rem] font-bold text-slate-900"
            >
                Please be noted that
                <span
                    class="border-b-2 border-dashed border-b-cyan-600 text-cyan-600"
                    >we currently support MySQL only</span
                >, but we are working on supporting other databases. Thank you.
            </p>
        </div>
        <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center"
        >
            <VAlert v-if="error !== ''" type="danger" class="mb-4">
                {{ error }}
            </VAlert>

            <p class="mb-2 text-xs font-bold text-slate-800">
                Please create your database to test your created diagrams.
            </p>
            <div class="flex">
                <VPlaygroundTextInput
                    id="databasePlaygroundTxtInput"
                    v-model="database"
                    placeholder="Create your database"
                    class="mr-2 w-[250px]"
                    @keydown.enter="createDatabase"
                />
                <VUniversalButton class="max-w-[100px]" @click="createDatabase">
                    <template #text>
                        <CircleLoader
                            v-if="isCreatingDatabase"
                            class="loader w-[15px]"
                        />
                        <span v-else> Create </span>
                    </template>
                </VUniversalButton>
            </div>

            <p
                class="absolute bottom-3 w-full text-center text-[.8rem] font-bold text-slate-900"
            >
                Note: Each time you use our application,
                <span
                    class="border-b-2 border-dashed border-b-rose-600 text-rose-600"
                >
                    you are creating a new MySQL database</span
                >. To avoid populating your system with unwanted databases,
                please check your database list and drop them.
            </p>
        </div>
    </div>
</template>

<style scoped>
.loader :deep(path) {
    stroke: white;
    fill: white;
}
</style>
