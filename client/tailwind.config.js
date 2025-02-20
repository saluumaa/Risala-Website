/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Enable dark mode using both `class` and `data-theme`
  theme: {
    extend: {
      colors: {
        bodyBackground: 'var(--body_background)',
        bodyBackground2: 'var(--body_background_2)',
        bodyColor: 'var(--body_color)',
        primary: 'var(--primary_color)',
      },
    },
  },
  plugins: [],
}