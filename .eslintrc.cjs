/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@electron-toolkit',
        '@electron-toolkit/eslint-config-ts/eslint-recommended',
        '@vue/eslint-config-typescript/recommended',
        '@vue/eslint-config-prettier',
    ],
    plugins: ['simple-import-sort'],
    rules: {
        'no-console': 2,
        'vue/require-default-prop': 0,
        'vue/multi-word-component-names': 0,
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^components', '^stores', '^composables', '^helpers'],
                    // node_modules imports.
                    ['^\\u0000'],
                ],
            },
        ],
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: false,
        },
    },
};
