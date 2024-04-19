import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  glsl()],
  // build: {
  //   // Adjust the path according to your specific folder structure
  //   outDir: '../client',
  // },
})
