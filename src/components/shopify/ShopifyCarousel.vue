<template>
  <div
    :style="{ backgroundColor: settings.backgroundColor }"
    class="product-list-wrapper swiper-product-list-wrapper featured-collection"
    :class="{
      'no-top-padding': settings.noTopPadding,
      'no-bottom-padding': settings.noBottomPadding,
    }"
    :data-limit="settings.itemLimit"
  >
    <div class="title center-text" v-if="settings.title">
      <h2 class="light-black">{{ settings.title }}</h2>
    </div>

    <div
      class="m-slider-reccomends__wrapper max-width"
      :class="{ 'swiper-has-shadow': settings.addBoxShadow }"
    >
      <div
        :id="swiperId"
        class="recommendations product-list row swiper"
        :class="{
          'no-top-padding': settings.noTopPadding,
          'no-bottom-padding': settings.noBottomPadding,
        }"
      >
        <div class="swiper-wrapper">
          <div
            v-for="item in displayItems"
            :key="item.id"
            class="product siema-product swiper-slide"
            :class="{ 'card-shadow': settings.addBoxShadow }"
          >
            <!-- Product Layout -->
            <template v-if="item.type === 'product'">
              <a class="product-image-wrapper" :href="item.url">
                <img
                  class="product-image lazyload blur-up"
                  :src="item.image?.src || placeholderImage"
                  :alt="item.image?.alt || item.title"
                  loading="lazy"
                />
              </a>
              <div class="product-info">
                <a :href="item.url">
                  <h5>{{ item.title }}</h5>
                </a>
                <div class="price-wrapper" v-if="item.price">
                  <h6 v-if="item.compareAtPrice" class="price m-n">
                    {{ item.compareAtPrice }}<br />
                    <span>${{ item.price }}</span>
                  </h6>
                  <h6 v-else class="price">${{ item.price }}</h6>
                </div>
              </div>
            </template>

            <!-- Blog Layout -->
            <template v-else-if="item.type === 'blog'">
              <a class="product-image-wrapper blog-image-wrapper" :href="item.url">
                <img
                  class="product-image lazyload blur-up"
                  :src="item.image?.src || placeholderImage"
                  :alt="item.image?.alt || item.title"
                  loading="lazy"
                />
              </a>
              <div class="product-info blog-info">
                <a :href="item.url">
                  <h5>{{ item.title }}</h5>
                </a>
                <p v-if="item.excerpt" class="blog-excerpt">
                  {{ truncateText(item.excerpt, 100) }}
                </p>
                <div class="blog-meta">
                  <span v-if="item.author" class="blog-author">By {{ item.author }}</span>
                  <span v-if="item.date" class="blog-date">{{ formatDate(item.date) }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Navigation buttons - Box Shadow Style -->
      <div v-if="settings.addBoxShadow" :class="`swiper-button-next js-rc-n-${componentId}`">
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
      <div v-if="settings.addBoxShadow" :class="`swiper-button-prev js-rc-p-${componentId}`">
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

      <!-- Navigation buttons - Default Style -->
      <div v-if="!settings.addBoxShadow" :class="`swiper-button-next js-rc-n-${componentId}`">
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
      <div v-if="!settings.addBoxShadow" :class="`swiper-button-prev js-rc-p-${componentId}`">
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
      <div class="m-sw-pg cs">
        <div :class="`swiper-pagination js-pg-n-${componentId}`"></div>
      </div>
    </div>

    <!-- Shop/View All link button -->
    <div v-if="settings.shopLinkText" class="m-fr-href">
      <a :href="linkUrl" :class="`button${!settings.primaryButton ? ' secondary' : ''}`">
        {{ settings.shopLinkText }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
  import { Swiper } from 'swiper'
  import { Navigation, Pagination } from 'swiper/modules'
  import type { CarouselItem, CarouselSettings } from '@/types/shopify'

  // Import Swiper styles
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'

  interface Props {
    items: CarouselItem[]
    settings: CarouselSettings
    linkUrl?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    linkUrl: '#',
  })

  // Generate unique IDs for this component instance
  const componentId = ref(`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)
  const swiperId = computed(() => `shopify-carousel-${componentId.value}`)

  // Placeholder image
  const placeholderImage = '/placeholder-image.png'

  // Swiper instance
  let swiperInstance: Swiper | null = null

  // Computed properties
  const displayItems = computed(() => {
    return props.items.slice(0, props.settings.itemLimit)
  })

  // Helper functions
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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

    // Destroy existing instance if it exists
    if (swiperInstance) {
      swiperInstance.destroy(true, true)
      swiperInstance = null
    }

    swiperInstance = new Swiper(`#${swiperId.value}`, {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      autoHeight: false,
      spaceBetween: 20,

      navigation: {
        nextEl: `.js-rc-n-${componentId.value}`,
        prevEl: `.js-rc-p-${componentId.value}`,
      },

      pagination: {
        el: `.js-pg-n-${componentId.value}`,
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
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
      },
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

<style lang="scss" scoped>
  .no-top-padding {
    padding-top: 0 !important;
  }

  .no-bottom-padding {
    padding-bottom: 0 !important;
  }

  // Blog-specific styling
  .blog-image-wrapper {
    // Blog images might have different aspect ratios
    .product-image {
      object-fit: cover;
      height: 200px; // Fixed height for consistency
    }
  }

  .blog-info {
    .blog-excerpt {
      font-size: 14px;
      line-height: 1.4;
      color: #666;
      margin: 8px 0;
    }

    .blog-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: #888;

      .blog-author {
        font-weight: 500;
      }

      .blog-date {
        color: #aaa;
      }
    }
  }

  // Product-specific styling adjustments
  .product-info {
    h5 {
      margin-bottom: 8px;
      font-size: 16px;
      line-height: 1.3;
    }

    .price-wrapper {
      .price {
        font-weight: 600;
        color: #333;

        &.m-n {
          text-decoration: line-through;
          color: #999;

          span {
            text-decoration: none;
            color: #e74c3c;
            font-weight: 700;
          }
        }
      }
    }
  }

  // Ensure consistent card heights
  .siema-product {
    display: flex;
    flex-direction: column;
    height: 100%;

    .product-image-wrapper {
      flex: 0 0 auto;
    }

    .product-info,
    .blog-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px 0;
    }
  }
</style>
