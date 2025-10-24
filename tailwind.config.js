/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ceara-blue': '#003366',
        'ceara-green': '#00A651',
        'ceara-gray': '#666666',
        'ceara-light-blue': '#0066CC',
      }
    },
  },
  plugins: [],
}