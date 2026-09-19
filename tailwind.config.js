/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A227",
          50: "#FBF4DC",
          100: "#F2E3AE",
          300: "#E3C45A",
          500: "#C9A227",
          700: "#8C6F1B",
          900: "#4A3A0E",
        },
        ink: {
          DEFAULT: "#0B0B0D",
          800: "#121216",
          700: "#1B1B21",
          600: "#26262E",
        },
      },
    },
  },
  plugins: [],
};
