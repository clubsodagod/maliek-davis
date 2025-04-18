import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    light: '#00AEEF',
                    dark: '#0078A0',
                },
                secondary: {
                    light: '#8DC63F',
                    dark: '#5A8E28',
                },
            },
            screens: {
                xs: "480px",
                "3xl": "1720px",
            },
        },
    },
    plugins: [],

} satisfies Config;
