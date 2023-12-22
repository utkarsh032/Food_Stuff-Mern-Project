/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        btnColor: "#FC6D87",
        btnColor2: "#FF7A92",
        btnColor3: "#FC6464"
      },
      color: {
        text1: "#0E3E4E",
        text2: "#949292",
        text3: "##808080",
        dot: "#EB2424"
      },

    },
  },
  plugins: [],
}

