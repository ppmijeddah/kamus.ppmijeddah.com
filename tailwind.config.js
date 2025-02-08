/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        "gradient-dashed": "20px 2px, 100% 2px",
      },
      fontFamily: {
        arabic: ["Amiri", "serif"],
        "pacamara-inter": ['"Inter"', "sans-serif"],
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
  plugins: [require("@tailwindcss/typography")],
};
