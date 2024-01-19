<script setup lang="ts">
import CloseIcon from '@components/Shared/Icons/CloseIcon.vue';
import { useScrollbar } from '@composables/Miscellaneous/useScrollbar';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

const emits = defineEmits<{
    (e: 'closeModal');
}>();
const root = ref();
const scrollbar = ref();
const { activate, deactivate } = useFocusTrap(root, {
    allowOutsideClick: true,
    returnFocusOnDeactivate: false,
});
useScrollbar(scrollbar);
onMounted(async () => {
    await nextTick();
    activate();
});
onUnmounted(() => {
    deactivate();
});
</script>
<template>
    <div
        ref="root"
        class="fixed top-[48px] h-[calc(100vh-48px)] w-full bg-white dark:bg-dark-900"
    >
        <div ref="scrollbar" class="h-full">
            <button
                type="button"
                class="duration-750 ml-auto mr-2 mt-4 block h-[25px] w-[25px] rounded-full border-none bg-rose-600 stroke-slate-50 p-2 outline-none transition-shadow hover:bg-rose-700 focus-visible:ring-4 focus-visible:ring-rose-600/30"
                @click="emits('closeModal')"
            >
                <CloseIcon />
            </button>
            <slot></slot>
        </div>
    </div>
</template>
