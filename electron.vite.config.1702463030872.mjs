// electron.vite.config.ts
import vue from '@vitejs/plugin-vue';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import VueMacros from 'unplugin-vue-macros/vite';
const electron_vite_config_default = defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src'),
                '@components': resolve('src/renderer/src/components'),
                '@stores': resolve('src/renderer/src/stores'),
                '@composables': resolve('src/renderer/src/composables'),
                '@utilities': resolve('src/renderer/src/utilities'),
            },
        },
        plugins: [
            VueMacros({
                plugins: {
                    vue: vue(),
                },
            }),
        ],
    },
});
export { electron_vite_config_default as default };
