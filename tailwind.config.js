/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          red: "#B91C1C",
          redDark: "#7F1D1D",

          black: "#111111",
          charcoal: "#1F1F1F",

          white: "#FFFFFF",

          soft: "#F8FAFC",

          border: "#E5E7EB",
        },
      },

      boxShadow: {
        premium:
          "0 20px 40px rgba(0,0,0,.10)",

        luxury:
          "0 30px 60px rgba(0,0,0,.15)",
      },

      borderRadius: {
        premium: "28px",
      },

      backdropBlur: {
        premium: "20px",
      },

      backgroundImage: {
        premium:
          "linear-gradient(135deg,#ffffff 0%,#f3f4f6 35%,#111111 100%)",

        luxury:
          "linear-gradient(135deg,#111111 0%,#1f1f1f 50%,#7f1d1d 100%)",
      },
    },
  },

  plugins: [],
};