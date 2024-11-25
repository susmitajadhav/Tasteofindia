import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://susmitajadhav.github.io/TasteOfIndia/', // Use your GitHub repository name if it's not a user page
})
