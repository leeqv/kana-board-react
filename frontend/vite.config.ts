import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev only. `npm run dev` runs Vite (5173) and Express (8080) as two separate servers
    // so fetch('/api') would hit Vite, which has no /api route.
    // This forwards it to 8080 (Express) instead.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
