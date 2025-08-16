<template>
  <div
    :style="{ backgroundColor: settings.backgroundColor }"
    class="product-list-wrapper swiper-product-list-wrapper featured-collection"
    :data-limit="settings.productLimit"
  >
    <h2 class="title">{{ settings.title }}</h2>
    <div
      class="m-slider-featured__wrapper max-width"
      :class="{ 'swiper-has-shadow': settings.addBoxShadow }"
    >
      <div :id="swiperId" class="product-list js-swiper swiper">
        <div class="swiper-wrapper">
          <div
            v-for="product in displayProducts"
            :key="product.id"
            class="product siema-product swiper-slide"
            :class="{ 'card-shadow': settings.addBoxShadow }"
          >
            <a class="product-image-wrapper" :href="product.url">
              <!-- Product badges (if any) -->
              <div v-if="product.badges?.length" class="product-badges">
                <span v-for="badge in product.badges" :key="badge" class="product-badge">
                  {{ badge }}
                </span>
              </div>

              <img
                class="product-image lazyload blur-up"
                :alt="product.featuredImage.alt"
                :src="product.featuredImage.src"
              />
            </a>

            <div class="product-info">
              <a :href="product.url">
                <h5>{{ product.title }}</h5>
              </a>
              <div class="price-wrapper">
                <h6
                  v-if="product.compareAtPrice && product.compareAtPrice > product.price"
                  class="original-price"
                >
                  ${{ formatPrice(product.compareAtPrice) }}<br />
                </h6>
                <h6 class="price">${{ formatPrice(product.price) }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div v-if="settings.addBoxShadow" :class="`swiper-button-next js-sw-n-${componentId}`">
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="23.5"
            cy="23.5"
            r="22.75"
            transform="rotate(-180 23.5 23.5)"
            fill="transparent"
            stroke="#1D2024"
            stroke-width="1.5"
          />
          <path
            d="M33.5303 24.5303C33.8232 24.2374 33.8232 23.7626 33.5303 23.4697L28.7574 18.6967C28.4645 18.4038 27.9896 18.4038 27.6967 18.6967C27.4038 18.9896 27.4038 19.4645 27.6967 19.7574L31.9393 24L27.6967 28.2426C27.4038 28.5355 27.4038 29.0104 27.6967 29.3033C27.9896 29.5962 28.4645 29.5962 28.7574 29.3033L33.5303 24.5303ZM14 24.75L33 24.75L33 23.25L14 23.25L14 24.75Z"
            fill="#1D2024"
          />
        </svg>
      </div>
      <div v-if="settings.addBoxShadow" :class="`swiper-button-prev js-sw-p-${componentId}`">
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="23.5"
            cy="23.5"
            r="22.75"
            fill="transparent"
            stroke="#1D2024"
            stroke-width="1.5"
          />
          <path
            d="M13.4697 22.4697C13.1768 22.7626 13.1768 23.2374 13.4697 23.5303L18.2426 28.3033C18.5355 28.5962 19.0104 28.5962 19.3033 28.3033C19.5962 28.0104 19.5962 27.5355 19.3033 27.2426L15.0607 23L19.3033 18.7574C19.5962 18.4645 19.5962 17.9896 19.3033 17.6967C19.0104 17.4038 18.5355 17.4038 18.2426 17.6967L13.4697 22.4697ZM33 22.25L14 22.25L14 23.75L33 23.75L33 22.25Z"
            fill="#1D2024"
          />
        </svg>
      </div>

      <div v-if="!settings.addBoxShadow" :class="`swiper-button-next js-sw-n-${componentId}`">
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="23.5"
            cy="23.5"
            r="22.75"
            transform="rotate(-180 23.5 23.5)"
            fill="#1D2024"
            stroke="white"
            stroke-width="1.5"
          />
          <path
            d="M33.5303 24.5303C33.8232 24.2374 33.8232 23.7626 33.5303 23.4697L28.7574 18.6967C28.4645 18.4038 27.9896 18.4038 27.6967 18.6967C27.4038 18.9896 27.4038 19.4645 27.6967 19.7574L31.9393 24L27.6967 28.2426C27.4038 28.5355 27.4038 29.0104 27.6967 29.3033C27.9896 29.5962 28.4645 29.5962 28.7574 29.3033L33.5303 24.5303ZM14 24.75L33 24.75L33 23.25L14 23.25L14 24.75Z"
            fill="white"
          />
        </svg>
      </div>
      <div v-if="!settings.addBoxShadow" :class="`swiper-button-prev js-sw-p-${componentId}`">
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="23.5" cy="23.5" r="22.75" fill="#1D2024" stroke="white" stroke-width="1.5" />
          <path
            d="M13.4697 22.4697C13.1768 22.7626 13.1768 23.2374 13.4697 23.5303L18.2426 28.3033C18.5355 28.5962 19.0104 28.5962 19.3033 28.3033C19.5962 28.0104 19.5962 27.5355 19.3033 27.2426L15.0607 23L19.3033 18.7574C19.5962 18.4645 19.5962 17.9896 19.3033 17.6967C19.0104 17.4038 18.5355 17.4038 18.2426 17.6967L13.4697 22.4697ZM33 22.25L14 22.25L14 23.75L33 23.75L33 22.25Z"
            fill="white"
          />
        </svg>
      </div>

      <!-- Pagination -->
      <div class="m-sw-pg">
        <div :class="`swiper-pagination js-pg-${componentId}`"></div>
      </div>
    </div>

    <!-- Shop link button -->
    <div v-if="settings.shopLinkText" class="product-collection-link center-text">
      <a
        :href="collectionUrl"
        :class="`button${!settings.primaryButton ? ' secondary' : ''} mobile-featured-collection-link`"
      >
        {{ settings.shopLinkText }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
  import { Swiper } from 'swiper'
  import { Navigation, Pagination } from 'swiper/modules'
  import type { Product, ProductSliderSettings } from '../types/product'

  // Import Swiper styles
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'

  interface Props {
    products: Product[]
    settings: ProductSliderSettings
    collectionUrl?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    collectionUrl: '#',
  })

  // Generate unique IDs for this component instance
  const componentId = ref(`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)
  const swiperId = computed(() => `featured-collection-${componentId.value}`)

  // Placeholder image
  const placeholderImage = '/placeholder-image.png'

  // Swiper instance
  let swiperInstance: Swiper | null = null

  // Computed properties
  const displayProducts = computed(() => {
    return props.products.slice(0, props.settings.productLimit)
  })

  // Format price helper
  const formatPrice = (price: number): string => {
    return price.toFixed(2)
  }

  // Height management functions (from original code)
  const addMinHeights = (elements: NodeListOf<Element>) => {
    const elementHeights = Array.from(elements).map(el => el.clientHeight)
    const maxHeight = Math.max(...elementHeights)

    elements.forEach(el => {
      ;(el as HTMLElement).style.height = maxHeight + 'px'
    })
  }

  const removeMinHeights = (elements: NodeListOf<Element>) => {
    elements.forEach(el => {
      ;(el as HTMLElement).style.height = ''
    })
  }

  const resizeEventHandler = () => {
    const swiperEl = document.getElementById(swiperId.value)
    if (!swiperEl) return

    const imageWrappers = swiperEl.querySelectorAll('.siema-product .product-image-wrapper')
    const productInfos = swiperEl.querySelectorAll('.siema-product .product-info')

    removeMinHeights(imageWrappers)
    removeMinHeights(productInfos)
    addMinHeights(imageWrappers)
    addMinHeights(productInfos)
  }

  // Initialize Swiper
  const initSwiper = async () => {
    await nextTick()

    const swiperEl = document.getElementById(swiperId.value)
    if (!swiperEl) return

    const breakpoints: { [width: number]: any } = props.settings.addBoxShadow
      ? {
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }
      : {
          550: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }

    swiperInstance = new Swiper(`#${swiperId.value}`, {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      autoHeight: false,
      spaceBetween: 15,

      navigation: {
        nextEl: `.js-sw-n-${componentId.value}`,
        prevEl: `.js-sw-p-${componentId.value}`,
      },

      pagination: {
        el: `.js-pg-${componentId.value}`,
        clickable: true,
      },

      breakpoints,
    })

    // Setup resize handling
    window.addEventListener('resize', resizeEventHandler)
    resizeEventHandler() // Initial call
  }

  // Lifecycle
  onMounted(() => {
    initSwiper()
  })

  onUnmounted(() => {
    if (swiperInstance) {
      swiperInstance.destroy(true, true)
    }
    window.removeEventListener('resize', resizeEventHandler)
  })
</script>

<style lang="scss">
  // The styles are already included in the existing _swiper-sliders.scss file
  // so we don't need to duplicate them here
</style>
