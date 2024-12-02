/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
    },
  },
  plugins: [],
};