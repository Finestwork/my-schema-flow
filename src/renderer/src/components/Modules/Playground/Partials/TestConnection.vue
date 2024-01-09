<script setup lang="ts">
import VPlaygroundTextInput from '@components/Base/Forms/VPlaygroundTextInput.vue';
import { reactive } from 'vue';

const connection = {
    database: '',
    host: '',
    port: '',
    user: '',
    password: '',
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
            <VPlaygroundTextInput
                id="pgDatabaseTxtInput"
                v-model="connection.database"
                placeholder="Place database name here"
                class="mb-2"
            >
                <template #label>Database:</template>
            </VPlaygroundTextInput>
            <div class="mb-2 flex">
                <VPlaygroundTextInput
                    id="pgHostTxtInput"
                    v-model="connection.host"
                    placeholder="Host"
                    class="mr-2"
                />
                <VPlaygroundTextInput
                    id="pgPortTxtInput"
                    v-model="connection.port"
                    placeholder="Port"
                />
            </div>
            <VPlaygroundTextInput
                id="pgUserTxtInput"
                v-model="connection.user"
                placeholder="User"
                class="mb-2"
            />
            <VPlaygroundTextInput
                id="pgPasswordTxtInput"
                v-model="connection.password"
                placeholder="Password"
                class="mb-2"
            />
            <button type="button">Connect</button>
        </div>
    </div>
</template>
