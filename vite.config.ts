import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

/**
 * Asset/router base path.
 * - Vercel / custom domain (default): `/`
 * - GitHub Pages: set `VITE_BASE=/paquicabello/` when building
 */
const base = process.env.VITE_BASE || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  server: {
    // Avoid clashing with other Vite apps that often claim 5173 locally.
    port: 5190,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
