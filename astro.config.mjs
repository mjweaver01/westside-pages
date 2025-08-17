import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "src/scss/_variables.scss" as *;`,
        },
      },
    },
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    assets: '_astro',
  },
})
