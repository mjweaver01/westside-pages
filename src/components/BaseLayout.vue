<template>
  <div id="app" :class="{ 'iframe-mode': isIframeMode }">
    <Header v-if="!isIframeMode" />
    <main>
      <slot />
    </main>
    <Footer v-if="!isIframeMode" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'

  interface Props {
    title?: string
    description?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Westside Pages',
    description: "The world's strongest training facility",
  })

  // Reactive iframe mode detection
  const isIframeMode = ref(false)

  // Detect iframe mode
  const detectIframeMode = (): boolean => {
    // Check if running in iframe context
    const isInIframe = window.self !== window.top

    // Check for manual iframe parameter
    const urlParams = new URLSearchParams(window.location.search)
    const iframeParam = urlParams.get('iframe') === 'true'

    return isInIframe || iframeParam
  }

  // Initialize iframe detection on mount
  onMounted(() => {
    isIframeMode.value = detectIframeMode()

    // Apply iframe-mode class to body
    if (isIframeMode.value) {
      document.body.classList.add('iframe-mode')
    }

    // Load iframe resizer if in iframe mode
    if (isIframeMode.value) {
      loadIframeResizer()
    }
  })

  // Dynamically load iframe resizer
  const loadIframeResizer = async () => {
    try {
      await import('iframe-resizer/js/iframeResizer.contentWindow.min.js')
      console.log('🎯 Iframe resizer loaded for content window')
    } catch (error) {
      console.warn('⚠️ Could not load iframe resizer:', error)
    }
  }

  // Computed properties for dynamic head management
  const pageTitle = computed(() => props.title)
  const pageDescription = computed(() => props.description)

  // Expose to parent for head management
  defineExpose({
    pageTitle,
    pageDescription,
    isIframeMode,
  })
</script>

<style lang="scss" scoped>
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    main {
      flex: 1;
    }
  }

  // Iframe mode styles
  #app.iframe-mode {
    min-height: auto;

    main {
      margin: 0;
      padding: 0;
      flex: none;
    }
  }
</style>

<style lang="scss">
  // Global iframe mode styles
  body.iframe-mode {
    margin: 0;
    padding: 0;
    background: transparent;

    * {
      box-sizing: border-box;
    }

    main {
      width: 100%;
      overflow-x: hidden;
    }
  }
</style>
