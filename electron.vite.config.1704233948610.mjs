// electron.vite.config.ts
import vue from '@vitejs/plugin-vue';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import VueMacros from 'unplugin-vue-macros/vite';
const electron_vite_config_default = defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        resolve: {
            alias: {
                '@main': resolve('src/main'),
            },
        },
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        resolve: {
            alias: {
                '@assets': resolve('src/renderer/src/assets'),
                '@directives': resolve('src/renderer/src/directives'),
                '@components': resolve('src/renderer/src/components'),
                '@stores': resolve('src/renderer/src/stores'),
                '@composables': resolve('src/renderer/src/composables'),
                '@utilities': resolve('src/renderer/src/utilities'),
                '@symbols': resolve('src/renderer/src/symbols'),
                '@dummy': resolve('src/renderer/src/dummy'),
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
