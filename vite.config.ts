import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

/** GitHub Pages serves the site at /{repo-name}/ */
const GITHUB_PAGES_BASE = '/paquicabello/'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? GITHUB_PAGES_BASE : '/',
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
