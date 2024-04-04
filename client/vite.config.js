import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      // allow: ['../node_modules/leaflet/dist/images']
      allow: ['../']
    }
  },
  plugins: [react()],
})
