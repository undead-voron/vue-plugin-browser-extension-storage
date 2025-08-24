import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      outDir: './dist',
      lib: {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        name: 'index',
        fileName: 'index',
      },
      rollupOptions: {
        external: [
          'webextension-polyfill',
          'vue'
        ],
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  }
})
