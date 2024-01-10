<script setup lang="ts">
import VUniversalButton from '@components/Base/Buttons/VUniversalButton.vue';
import VPlaygroundTextInput from '@components/Base/Forms/VPlaygroundTextInput.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import CircleLoader from '@components/Base/Loaders/CircleLoader.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { reactive, ref } from 'vue';

const playgroundStore = usePlaygroundStore();
const isLoading = ref(false);
const error = ref('');
const connection = reactive({
    host: '',
    port: '',
    user: '',
    password: '',
});

const connectMySQL = async () => {
    error.value = '';
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    const Result = await window.api.connectMySQL(Object.assign({}, connection));

    if (Result.error !== null) {
        error.value = Result.error.message;
        isLoading.value = false;
        return;
    }

    playgroundStore.connection = Object.assign({}, connection);
    isLoading.value = false;
};
</script>
<template>
    <div>
        <p class="text-sm font-semibold text-slate-900 dark:text-slate-400">
            To dive into our
            <span
                class="border-b-2 border-dashed border-b-cyan-600 text-cyan-600 dark:border-b-cyan-500 dark:text-cyan-500"
                >code playground</span
            >, let's first get connected to our database. Simply fill out the
            form below, and you'll be all set to explore.
        </p>

        <div class="mx-auto mt-10 w-full max-w-[350px]">
            <VAlert v-if="error !== ''" type="danger" class="mb-4">
                {{ error }}
            </VAlert>
            <div class="mb-2 flex">
                <VPlaygroundTextInput
                    id="pgHostTxtInput"
                    v-model="connection.host"
                    placeholder="Host"
                    class="mr-2"
                    @keydown.enter="connectMySQL"
                />
                <VPlaygroundTextInput
                    id="pgPortTxtInput"
                    v-model="connection.port"
                    placeholder="Port"
                    @keydown.enter="connectMySQL"
                />
            </div>
            <VPlaygroundTextInput
                id="pgUserTxtInput"
                v-model="connection.user"
                placeholder="User"
                class="mb-2"
                @keydown.enter="connectMySQL"
            />
            <VPlaygroundTextInput
                id="pgPasswordTxtInput"
                v-model="connection.password"
                type="password"
                placeholder="Password"
                class="mb-2"
                @keydown.enter="connectMySQL"
            />
            <VUniversalButton @click="connectMySQL">
                <template #text>
                    <CircleLoader v-if="isLoading" class="loader w-[15px]" />
                    <span v-else>Connect</span>
                </template>
            </VUniversalButton>
        </div>
    </div>
</template>

<style scoped>
.loader :deep(path) {
    stroke: white;
    fill: white;
}
</style>
