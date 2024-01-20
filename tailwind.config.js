/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/renderer/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'neon-mono': ['NeonMono', 'sans-serif'],
            },
            colors: {
                dark: {
                    50: '#8695BB',
                    100: '#7C8DB6',
                    200: '#697BAB',
                    300: '#566999',
                    400: '#4B5C86',
                    500: '#3E4C6F',
                    600: '#333F5B',
                    700: '#272F45',
                    800: '#1C2231',
                    850: '#171A22',
                    900: '#0F121A',
                    950: '#090B10',
                },
            },
        },
    },
    plugins: [],
};
