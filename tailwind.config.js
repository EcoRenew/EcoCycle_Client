/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["'Noto Sans'", "sans-serif"],
        grotesk: ["'Space Grotesk'", "sans-serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
      colors: {
        ecoGreen: "#38af44", // your custom green
        bg: "var(--bg)", // background variable
        text: "var(--text)", // text variable
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
