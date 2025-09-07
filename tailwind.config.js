/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["'Noto Sans'", "sans-serif"],
        grotesk: ["'Space Grotesk'", "sans-serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
      colors: {
        ecoGreen: "#38af44",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite", // 5 seconds per rotation
      },
    },
  },
  plugins: [],
};
