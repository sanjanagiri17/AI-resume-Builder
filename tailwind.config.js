/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        background: '#ffffff',
        text: '#000000',
      },
    },
  },
  plugins: [],
  experimental: {
    optimizeUniversalDefaults: true, 
}

