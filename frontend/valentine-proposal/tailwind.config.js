/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fall-hearts": "fall-hearts 8s linear infinite",
      },
      keyframes: {
        "fall-hearts": {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
