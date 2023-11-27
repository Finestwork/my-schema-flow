/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/renderer/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                jetbrains: ['Jetbrains Mono', 'sans-serif'],
            },
            colors: {
                light: {
                    50: '#C9D4EB',
                    100: '#BCC9E6',
                    200: '#A2B4DD',
                    300: '#889FD3',
                    400: '#6D8BCA',
                    500: '#5376C0',
                    600: '#3B5BA0',
                    700: '#2C4477',
                    800: '#1D2C4E',
                    900: '#0E1525',
                    950: '#060A11',
                },
                dark: {
                    50: '#677BA4',
                    100: '#5F73A0',
                    200: '#566590',
                    300: '#4A567C',
                    400: '#414A6C',
                    500: '#373E5D',
                    600: '#2E324D',
                    700: '#222539',
                    800: '#191A29',
                    900: '#0F101A',
                    950: '#0A0A10',
                },
            },
        },
    },
    plugins: [],
};
