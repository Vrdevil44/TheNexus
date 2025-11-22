import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--bg-start) / <alpha-value>)",
                primary: "hsl(var(--color-primary) / <alpha-value>)",
                "primary-dim": "hsl(var(--color-primary-dim) / <alpha-value>)",
                "primary-glow": "hsl(var(--color-primary-glow) / <alpha-value>)",
                secondary: "hsl(var(--color-secondary) / <alpha-value>)",
                "secondary-dim": "hsl(var(--color-secondary-dim) / <alpha-value>)",
                "secondary-glow": "hsl(var(--color-secondary-glow) / <alpha-value>)",
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
        },
    },
    plugins: [],
};
export default config;
