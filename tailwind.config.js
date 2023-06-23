/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./src/lib/assets/fonts/grifterbold.otf",
  ],
  theme: {
    extend: {
      fontFamily: {
        grifter: ['Grifter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

