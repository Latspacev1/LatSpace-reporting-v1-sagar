/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#074D47',
        success: '#37B77A',
        warning: '#F5A623',
        error: '#E54D4D',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '24px',
      },
      boxShadow: {
        'card': '0 2px 6px rgba(0,0,0,.08)',
      },
    },
  },
  plugins: [],
}