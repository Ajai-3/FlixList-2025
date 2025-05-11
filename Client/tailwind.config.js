/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-color-1': '#00e90e',
        'main-color-2': '#37b79c'
      },
      fontFamily: {
        sans: ['Poppins', 'DM Sans', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('tailwind-scrollbar'),
  ]
}

