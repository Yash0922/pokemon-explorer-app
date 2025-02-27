/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          'pokemon-red': '#EE1515',
          'pokemon-blue': '#3B4CCA',
          'pokemon-yellow': '#FFDE00',
          'pokemon-gold': '#B3A125',
          'pokemon-dark': '#1A1A1A',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        animation: {
          'bounce-slow': 'bounce 3s infinite',
        }
      },
    },
    plugins: [],
  };