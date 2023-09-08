/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Poppins', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        wiggle: 'wiggle 2s ease-in-out infinite'
      },
      keyframes:{
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        }
      }
    },
  },
  plugins: [],
}

