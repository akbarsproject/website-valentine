import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        app: {
          bg: "var(--app-bg)",
          fg: "var(--app-fg)",
          accent: "var(--app-accent)",
          rose: "var(--app-rose)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
