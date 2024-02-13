/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      'xl': { 'max': '1200px' },
      'lg': { 'max': '900px' },
      'md': { 'max': '730px' },
      'sm': { 'max': '600px' },
      'xs': { 'max': '400px' },
    },
  }
}