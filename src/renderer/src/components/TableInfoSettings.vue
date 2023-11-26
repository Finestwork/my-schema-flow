<script setup lang="ts"></script>

<template>
    <div>
        <button
            class="block w-full px-2 py-2.5 text-left text-xs font-semibold dark:bg-dark-700 dark:text-dark-300 dark:hover:bg-dark-700/70"
            type="button"
        >
            <span>Table Settings</span>
        </button>

        <div class="mx-2 my-2.5">
            <label
                class="mb-2 inline-flex cursor-pointer text-xs font-medium dark:text-slate-300"
                for="tableSettingsTableName"
                >Table Name:</label
            >
            <input
                class="block w-full rounded-sm border-2 bg-transparent px-1.5 py-1.5 text-xs font-semibold outline-none transition-shadow duration-300 focus:ring-4 focus:ring-blue-500/60 dark:border-slate-300 dark:text-slate-300 dark:focus:border-blue-300"
                type="text"
                placeholder="Place table name here"
                id="tableSettingsTableName"
            />
        </div>
    </div>
</template>
