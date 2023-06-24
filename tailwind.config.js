/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    "./src/lib/assets/fonts/grifterbold.otf",
  ],
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {
    extend: {
      fontFamily: {
        grifter: ['Grifter', 'sans-serif'],
      },
    },
  }
}

