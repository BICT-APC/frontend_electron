import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

const env = loadEnv('', process.cwd())
const baseUrl = env.VITE_TARGET_BASE_URL || ''

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    server: {
      host: '0.0.0.0',
      port: 5123,
      proxy: {
        '/auth-api': {
          target: `http://${baseUrl}`,
          // target: 'http://14.42.211.57:31000', // 평택
          changeOrigin: true
        },
        '/cctv-api': {
          target: `http://${baseUrl}`,
          changeOrigin: true
        },
        '/human-detect-api': {
          target: `http://${baseUrl}`,
          changeOrigin: true
        },
        '/apc-api': {
          target: `http://${baseUrl}`,
          changeOrigin: true
        },
        '/human-detect-module': {
          target: `http://${baseUrl}`,
          changeOrigin: true
        },
        '/app-manage-api': {
          target: `http://${baseUrl}`,
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
