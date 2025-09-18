import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: mode === 'development' ? ['@locator/babel-jsx/dist'] : []
      }
    }),
    tailwindcss()
  ],
}))
