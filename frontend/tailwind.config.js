import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : "#5f6FFF"
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})