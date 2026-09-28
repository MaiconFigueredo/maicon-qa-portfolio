import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/maicon-qa-portfolio/',
  plugins: [react()],
})
