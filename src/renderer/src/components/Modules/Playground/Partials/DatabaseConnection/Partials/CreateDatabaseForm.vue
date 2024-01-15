<script setup lang="ts">
import VAlert from '@components/Base/Alerts/VAlert.vue';
import VPlaygroundTextInput from '@components/Base/Forms/VPlaygroundTextInput.vue';
import VUniversalButton from '@components/Base/Buttons/VUniversalButton.vue';
import VPlaygroundDropdown from '@components/Base/Forms/VPlaygroundDropdown.vue';
import CircleLoader from '@components/Base/Loaders/CircleLoader.vue';
import { usePlaygroundStore } from '@stores/Playground';
import { ref } from 'vue';

const playgroundStore = usePlaygroundStore();
const isCreatingDatabase = ref(false);
const customizedDatabase = ref('');
const storedDatabase = ref('');
const error = ref('');
const createDatabase = async () => {
    if (isCreatingDatabase.value) return;

    isCreatingDatabase.value = true;

    const DatabaseName =
        customizedDatabase.value.trim() !== ''
            ? customizedDatabase.value
            : storedDatabase.value;
    const DatabaseNameProp =
        customizedDatabase.value.trim() !== ''
            ? 'customizedDatabase'
            : 'storedDatabase';

    const Options = Object.assign(
        {
            [DatabaseNameProp]: DatabaseName,
        },
        playgroundStore.connection,
    );

    await new Promise((resolve) => setTimeout(() => resolve(null), 450));
    const Result = await window.api.createDatabase(Options);
    isCreatingDatabase.value = false;

    if (Result.error !== null) {
        error.value = Result.error.message;
    } else {
        playgroundStore.database = DatabaseName;
    }
};
</script>

<template>
    <div class="flex h-full w-full flex-col items-center justify-center">
        <div
            class="flex w-full max-w-[350px] flex-col items-center justify-center"
        >
            <VAlert v-if="error !== ''" type="danger" class="mb-4">
                {{ error }}
            </VAlert>

            <div>
                <p class="mb-2 text-xs font-bold text-slate-800">
                    Please create your database to test your created diagrams.
                </p>
                <VPlaygroundTextInput
                    id="databasePlaygroundTxtInput"
                    v-model="customizedDatabase"
                    placeholder="Create your database"
                    class="mr-2 w-full"
                    @keydown.enter="createDatabase"
                    @input="storedDatabase = ''"
                />
            </div>

            <div class="mb-4 mt-5 flex items-center">
                <hr
                    class="mr-2 block w-[50px] border-[1.5px] border-slate-400/70"
                />
                <span
                    class="text-xs font-semibold text-slate-700 dark:text-slate-400"
                    >Or</span
                >
                <hr
                    class="ml-2 block w-[50px] border-[1.5px] border-slate-400/70"
                />
            </div>

            <div
                v-if="playgroundStore.storedDatabases.length !== 0"
                class="w-full"
            >
                <VPlaygroundDropdown
                    id="databases"
                    v-model="storedDatabase"
                    class="w-full"
                    @on-change="customizedDatabase = ''"
                >
                    <option
                        value=""
                        disabled
                        class="font-semibold text-slate-500/80 dark:text-slate-400/90"
                    >
                        -- Please Select --
                    </option>
                    <option
                        v-for="db in playgroundStore.storedDatabases"
                        :key="db"
                        :value="db"
                        class="font-semibold text-slate-900"
                    >
                        {{ db }}
                    </option>
                </VPlaygroundDropdown>
            </div>

            <VUniversalButton class="mt-2 w-full" @click="createDatabase">
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
            class="absolute bottom-3 w-full text-center text-[.8rem] font-bold text-slate-900 dark:text-slate-400"
        >
            Note: Each time you use our application,
            <span
                class="border-b-2 border-dashed border-b-rose-600 text-rose-600"
            >
                you are creating a new MySQL database</span
            >. To avoid populating your system with unwanted databases, please
            check your database list and drop them.
        </p>
    </div>
</template>

<style scoped>
.loader :deep(path) {
    stroke: white;
    fill: white;
}
</style>
