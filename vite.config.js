import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/detect': {
        target: 'https://evure-dermasight.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
