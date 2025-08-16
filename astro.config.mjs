import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "src/scss/_variables.scss" as *;`,
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    assets: '_astro',
  },
})
