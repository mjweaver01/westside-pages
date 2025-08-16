/// <reference types="astro/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
  const Component: AstroComponentFactory
  export default Component
}
