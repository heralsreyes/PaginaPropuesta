import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6", // Off-white / Light Stone Canvas
        surface: "#FFFFFF",    // Pure White Card Surface
        border: "#E4E4E7",     // Light Gray Border (Zinc-200)
        foreground: "#111111", // Deep Obsidian Charcoal
        muted: {
          DEFAULT: "#71717A",  // Muted Zinc-500
          light: "#A1A1AA",
          dark: "#3F3F46",
        },
        cobalt: {
          DEFAULT: "#2563EB", // Primary Accent Cobalt Blue (blue-600)
          hover: "#1D4ED8",   // blue-700
          light: "#EFF6FF",   // blue-50
          border: "#BFDBFE",  // blue-200
        },
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
};
export default config;
