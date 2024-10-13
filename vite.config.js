import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path"
import process from 'node:process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "ecomminds",
    project: "javascript-react"
  })],

  server: {
    port: 3000
  },

  resolve: {
    alias: {
      "@":  path.resolve(process.cwd(), "src")
    }
  },

  build: {
    sourcemap: true
  }
})