// Iframe detection and setup
export function detectIframeMode() {
  const isInIframe = window.self !== window.top
  const urlParams = new URLSearchParams(window.location.search)
  const iframeParam = urlParams.get('iframe') === 'true'
  return isInIframe || iframeParam
}

// Load iframe resizer dynamically
function loadIframeResizer() {
  try {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@iframe-resizer/child@5.5.2/index.umd.js'
    script.onload = () => {
      console.log('🎯 Iframe resizer child loaded from CDN')
    }
    script.onerror = () => {
      console.warn('⚠️ Could not load iframe resizer child from CDN')
    }
    document.head.appendChild(script)
  } catch (error) {
    console.warn('⚠️ Iframe resizer load failed:', error)
  }
}

// Initialize iframe mode
export function initializeIframeMode() {
  const isIframeMode = detectIframeMode()

  if (isIframeMode) {
    // Hide header and footer
    const header = document.querySelector('.site-header')
    const footer = document.querySelector('.site-footer')
    if (header && header instanceof HTMLElement) {
      header.style.display = 'none'
    }
    if (footer && footer instanceof HTMLElement) {
      footer.style.display = 'none'
    }

    // Add iframe mode classes
    document.body.classList.add('iframe-mode')
    document.getElementById('app')?.classList.add('iframe-mode')

    // Load iframe resizer
    loadIframeResizer()
  }
}

initializeIframeMode()
