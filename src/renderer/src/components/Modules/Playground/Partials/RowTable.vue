<script setup lang = "ts"> 
import { usePlaygroundStore } from '@stores/Playground';

const playgroundStore = usePlaygroundStore();
</script>

<template>
    <table class="w-full table-auto">
        <thead>
            <tr>
                <td v-for="row in playgroundStore.currentColumns" :key="row">
                    {{ row }}
                </td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in playgroundStore.resultRows" :key="row">
                <td v-for="data in row" :key="data">
                    {{ data }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
