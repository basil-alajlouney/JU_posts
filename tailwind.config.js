import tailwindcssScrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/lib/components/*.svelte",
    "./src/app.html",
    "./src/routes/**/*.{svelte,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssScrollbar],
}

