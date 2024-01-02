<script setup lang="ts">
import ToggleDarkMode from '@components/Modules/Settings/Partials/Contents/Appearance/Partials/ToggleDarkMode.vue';
import ToggleJumpAnimation from '@components/Modules/Settings/Partials/Contents/Appearance/Partials/ToggleJumpAnimation.vue';
import ChangeBackgroundVariant from '@components/Modules/Settings/Partials/Contents/Appearance/Partials/ChangeBackgroundVariant.vue';
</script>

<template>
    <div class="divide-y-2 divide-solid">
        <ToggleDarkMode class="py-8" />
        <ToggleJumpAnimation class="py-8" />
        <ChangeBackgroundVariant class="pt-8" />
    </div>
</template>
