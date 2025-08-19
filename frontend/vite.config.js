import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import netlify from '@netlify/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), netlify()],
  server: {
    proxy: {
  '/api': process.env.BACKEND_API_URL || 'http://localhost:3000',
    },
  },
})
