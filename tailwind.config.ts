import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "selector",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundSize: {
        "gradient-dashed": "20px 2px, 100% 2px",
      },
      fontFamily: {
        arabic: ["Amiri", "serif"],
        "pacamara-inter": ["var(--font-inter)", "sans-serif"],
        "pacamara-space": ['"Space Grotesk"', "sans-serif"],
      },
      boxShadow: {
        "pacamara-shadow": "0px 25px 50px -12px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        "pacamara-primary": "#003049",
        "pacamara-secondary": "#098bb3",
        "pacamara-accent": "#b1b720",
        "pacamara-dark": "#000E14",
        "pacamara-white": "#ffffff",
      },
      aspectRatio: {
        "9/10": "9 / 16",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
