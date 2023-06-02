import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@s': path.resolve(__dirname, './src'),
      '@pg': path.resolve(__dirname, './src/pages'),
      '@fs': path.resolve(__dirname, './src/features'),
      '@en': path.resolve(__dirname, './src/entities'),
      '@as': path.resolve(__dirname, './src/assets'),
      '@sh': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:5000`,
        changeOrigin: true
      }
    }
  }
})
