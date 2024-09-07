import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {port: process.env.PORT || 4000}
})
// Met
// serve
/**
 * npm install serve
 * script : {
 *  "start" : "serve -s dist -l $PORT"
 * }
 */