import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "var(--font-geist)",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
            },
            // Custom spacing for consistent rhythm
            spacing: {
                "18": "4.5rem",
            },
            // SHEVA brand colors extended
            colors: {
                sheva: {
                    green: {
                        DEFAULT: "#065f46", // emerald-800
                        light: "#10b981", // emerald-500
                        dark: "#022c22", // emerald-950
                    },
                },
            },
            // Subtle animations
            animation: {
                "fade-up": "fadeUp 0.6s ease forwards",
                "fade-in": "fadeIn 0.4s ease forwards",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
