/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-color-1': '#00e90e',
        'main-color-2': '#37b79c',
        'main-color-3': "#10B981", // emerald-500
        'main-color-4': "#059669", // emerald-600

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

