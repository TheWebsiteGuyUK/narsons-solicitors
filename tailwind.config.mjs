/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#E3E8F0', 
          100: '#C6CEDD', 
          200: '#95A5C5', 
          300: '#657DAF', 
          400: '#345599', 
          500: '#0D2744', 
          600: '#0C233D', 
          700: '#0A1F36', 
          800: '#091A2F', 
          900: '#071628', 
        },
        'silver': '#B5B5B5', 
      },
    },
  },
  daisyui: {
    themes: ["nord"],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
    require("preline/plugin",

    )],
};
