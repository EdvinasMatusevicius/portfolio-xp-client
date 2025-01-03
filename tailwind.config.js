/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        xp:['Tahoma', 'Noto Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

