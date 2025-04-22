import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    server: {
      proxy: {
        '/cctv-api': {
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        },
        '/apc-api': {
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        },
        '/human-detect-api': {
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        },
        '/auth-api': {
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
