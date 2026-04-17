/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#e8e8e0',
      },
      perspective: {
        'dramatic': '800px',
      },
      aspectRatio: {
        '3/6': '3 / 6',
        '3/5': '3 / 5',
      },
    },
  },
  plugins: [],
}
