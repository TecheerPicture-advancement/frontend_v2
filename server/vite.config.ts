import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSvgPlugin from 'vite-plugin-react-svg';
export default defineConfig({
  plugins: [
    react(),
    reactSvgPlugin({defaultExport: true})
  ], 
})