/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Scans everything inside app/
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans everything inside components/
    "./features/**/*.{js,ts,jsx,tsx,mdx}",   // Add this if features is a root folder
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#D4B16A",
          dark: "#09141A",
        },
      },
    },
  },
  plugins: [],
}