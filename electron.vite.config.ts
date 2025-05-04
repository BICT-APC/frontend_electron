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
        '/auth-api': {
          // target: 'http://14.42.211.57:31000', 평택
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        },
        '/cctv-api': {
          // target: 'http://14.42.211.57:31000', 평택
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        },
        '/human-detect-api': {
          // target: 'http://14.42.211.57:31000', 평택
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        },
        '/apc-api': {
          // target: 'http://14.42.211.57:31000', 평택
          target: 'http://192.168.0.185:31000',
          changeOrigin: true
        },
        '/human-detect-module': {
          // target: 'http://14.42.211.57:31000', 평택
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
