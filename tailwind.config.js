/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{html,js}",
    "./src/index.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // KEEP ALL CLASSES IN PRODUCTION
  safelist: [
    {
      pattern: /./ // <-- This keeps EVERY Tailwind class
    }
  ]
}