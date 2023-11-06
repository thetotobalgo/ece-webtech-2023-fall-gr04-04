/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-font-inter'),     // Ajoute le plugin font-inter
  require('@tailwindcss/typography'),     // Ajoute le plugin typography
  require('@tailwindcss/forms'),          // Ajoute le plugin forms
  ]
}