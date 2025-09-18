/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors - using object notation for Tailwind v4
        background: {
          primary: '#121212',   // Very dark gray, almost black
          secondary: '#1E1E1E', // Slightly lighter dark gray
          tertiary: '#2D2D2D',  // Medium dark gray
        },
        button: {
          primary: '#3700B3',   // Deep purple
          secondary: '#6200EE', // Bright purple
          tertiary: '#BB86FC',  // Light purple
        },
        text: {
          primary: '#FFFFFF',   // White
          secondary: '#E1E1E1', // Light gray
          tertiary: '#A0A0A0',  // Medium gray
        }
      },
      screens: {
        'mobile': {'max': '767px'},  // Portrait mobile screens (up to 767px)
        'desktop': {'min': '768px'}, // Landscape tablet + laptop screens (768px and above)
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}