import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': rootDir } },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, 'index.html'),
        designBuddy: path.resolve(rootDir, 'design-buddy/index.html'),
      },
    },
  },
})
