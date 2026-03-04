import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                navy: {
                    900: '#0a192f',
                    800: '#112240',
                },
                orange: {
                    500: '#f97316',
                    400: '#fb923c',
                }
            },
        },
    },
    plugins: [],
};
export default config;
