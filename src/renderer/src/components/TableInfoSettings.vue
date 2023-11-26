<script setup lang="ts"></script>
<template>
    <div>
        <button
            class="text-xs block w-full text-left dark:text-dark-300 font-semibold px-2 py-2.5 dark:bg-dark-700 dark:hover:bg-dark-700/70"
            type="button"
        >
            <span>Table Settings</span>
        </button>

        <div class="my-2.5 mx-2">
            <label
                class="cursor-pointer dark:text-slate-300 text-sm font-medium inline-flex mb-2"
                for="tableSettingsTableName"
                >Table Name:</label
            >
            <input
                class="block bg-transparent border-2 dark:border-slate-300 dark:text-slate-300 w-full rounded-sm px-1.5 py-1.5 font-semibold text-xs outline-none focus:ring-4 transition-shadow duration-300 focus:ring-blue-500/60 dark:focus:border-blue-300"
                type="text"
                placeholder="Place table name here"
                id="tableSettingsTableName"
            />
        </div>
    </div>
</template>
