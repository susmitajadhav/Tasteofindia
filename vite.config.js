import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tasteofindia', // This sets the base URL, // Use your GitHub repository name if it's not a user page
})
