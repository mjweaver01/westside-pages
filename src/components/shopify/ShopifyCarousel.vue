<template>
  <div
    :style="{ backgroundColor: settings.backgroundColor }"
    class="product-list-wrapper swiper-product-list-wrapper featured-collection"
    :class="{
      'no-top-padding': settings.noTopPadding,
      'no-bottom-padding': settings.noBottomPadding,
      'invert-theme': settings.invert,
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
              <div class="blog-article">
                <div class="article-image">
                  <a :href="item.url">
                    <img
                      class="product-image lazyload blur-up"
                      :src="item.image?.src || placeholderImage"
                      :alt="item.image?.alt || item.title"
                      :data-src="item.image?.src || placeholderImage"
                      data-widths="[360, 540, 720, 900, 1080, 1600]"
                      :data-aspectratio="item.image?.aspectRatio || '1.0'"
                      data-sizes="auto"
                      loading="lazy"
                    />
                    <noscript>
                      <img
                        class="lazyloaded"
                        :src="item.image?.src || placeholderImage"
                        :alt="item.image?.alt || item.title"
                      />
                    </noscript>
                  </a>
                </div>

                <p v-if="item.tags && item.tags.length > 0">
                  <span v-for="(tag, index) in item.tags" :key="tag" class="tags">
                    <span v-if="index > 0">&nbsp;|&nbsp;</span>
                    <a :href="`/blogs/the-blog/tagged/${tag.toLowerCase().replace(/\s+/g, '-')}`">
                      {{ tag }}
                    </a>
                  </span>
                </p>

                <h3>
                  <a :href="item.url">
                    {{ item.title }}
                  </a>
                </h3>

                <p v-if="item.excerpt">
                  {{ truncateText(item.excerpt, 200) }} <a :href="item.url">Read more</a>
                </p>

                <p class="posted-by">
                  By {{ item.author || 'WSBB' }} on {{ formatDate(item.date || '') }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Navigation buttons - Box Shadow Style -->
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
            :stroke="settings.invert ? 'white' : '#1D2024'"
            stroke-width="1.5"
          />
          <path
            d="M33.5303 24.5303C33.8232 24.2374 33.8232 23.7626 33.5303 23.4697L28.7574 18.6967C28.4645 18.4038 27.9896 18.4038 27.6967 18.6967C27.4038 18.9896 27.4038 19.4645 27.6967 19.7574L31.9393 24L27.6967 28.2426C27.4038 28.5355 27.4038 29.0104 27.6967 29.3033C27.9896 29.5962 28.4645 29.5962 28.7574 29.3033L33.5303 24.5303ZM14 24.75L33 24.75L33 23.25L14 23.25L14 24.75Z"
            :fill="settings.invert ? 'white' : '#1D2024'"
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
            :stroke="settings.invert ? 'white' : '#1D2024'"
            stroke-width="1.5"
          />
          <path
            d="M13.4697 22.4697C13.1768 22.7626 13.1768 23.2374 13.4697 23.5303L18.2426 28.3033C18.5355 28.5962 19.0104 28.5962 19.3033 28.3033C19.5962 28.0104 19.5962 27.5355 19.3033 27.2426L15.0607 23L19.3033 18.7574C19.5962 18.4645 19.5962 17.9896 19.3033 17.6967C19.0104 17.4038 18.5355 17.4038 18.2426 17.6967L13.4697 22.4697ZM33 22.25L14 22.25L14 23.75L33 23.75L33 22.25Z"
            :fill="settings.invert ? 'white' : '#1D2024'"
          />
        </svg>
      </div>

      <!-- Navigation buttons - Default Style -->
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
            :fill="settings.invert ? 'transparent' : '#1D2024'"
            :stroke="settings.invert ? 'white' : 'white'"
            stroke-width="1.5"
          />
          <path
            d="M33.5303 24.5303C33.8232 24.2374 33.8232 23.7626 33.5303 23.4697L28.7574 18.6967C28.4645 18.4038 27.9896 18.4038 27.6967 18.6967C27.4038 18.9896 27.4038 19.4645 27.6967 19.7574L31.9393 24L27.6967 28.2426C27.4038 28.5355 27.4038 29.0104 27.6967 29.3033C27.9896 29.5962 28.4645 29.5962 28.7574 29.3033L33.5303 24.5303ZM14 24.75L33 24.75L33 23.25L14 23.25L14 24.75Z"
            :fill="settings.invert ? 'white' : 'white'"
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
          <circle
            cx="23.5"
            cy="23.5"
            r="22.75"
            :fill="settings.invert ? 'transparent' : '#1D2024'"
            :stroke="settings.invert ? 'white' : 'white'"
            stroke-width="1.5"
          />
          <path
            d="M13.4697 22.4697C13.1768 22.7626 13.1768 23.2374 13.4697 23.5303L18.2426 28.3033C18.5355 28.5962 19.0104 28.5962 19.3033 28.3033C19.5962 28.0104 19.5962 27.5355 19.3033 27.2426L15.0607 23L19.3033 18.7574C19.5962 18.4645 19.5962 17.9896 19.3033 17.6967C19.0104 17.4038 18.5355 17.4038 18.2426 17.6967L13.4697 22.4697ZM33 22.25L14 22.25L14 23.75L33 23.75L33 22.25Z"
            :fill="settings.invert ? 'white' : 'white'"
          />
        </svg>
      </div>

      <!-- Pagination -->
      <div class="m-sw-pg cs">
        <div :class="`swiper-pagination js-pg-n-${componentId}`"></div>
      </div>
    </div>

    <!-- Shop/View All link button -->
    <div v-if="settings.shopLinkText" class="all-button m-fr-href">
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

  // Generate consistent IDs based on component content to avoid hydration mismatch
  const generateComponentId = () => {
    // Create a simple hash based on the first item and settings
    const firstItemTitle = props.items[0]?.title || 'default'
    const titleStr = props.settings.title || 'notitle'
    const combinedStr = `${firstItemTitle}-${titleStr}-${props.items.length}`

    // Simple hash function
    let hash = 0
    for (let i = 0; i < combinedStr.length; i++) {
      const char = combinedStr.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }

    return Math.abs(hash).toString(36)
  }

  const componentId = ref(`carousel-${generateComponentId()}`)
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

    const isBlog = displayItems.value[0]?.type === 'blog' || false

    swiperInstance = new Swiper(`#${swiperId.value}`, {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      autoHeight: false,
      spaceBetween: isBlog ? 16 : 20,
      loop: props.settings.infinite || false,

      navigation: {
        nextEl: `.js-sw-n-${componentId.value}`,
        prevEl: `.js-sw-p-${componentId.value}`,
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
          slidesPerView: isBlog ? 2 : 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: isBlog ? 3 : 4,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: isBlog ? 3 : 4,
          spaceBetween: isBlog ? 20 : 40,
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
  @use '@/scss/variables.scss' as *;

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

  .all-button {
    display: flex;
    justify-content: center;
    align-items: center;
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

  // Blog article specific styling
  .blog-article {
    .article-image {
      width: 100%;
      overflow: hidden;
      position: relative;
      margin-bottom: 15px;

      a {
        display: block;
        width: 100%;
      }

      img {
        width: 100%;
        height: auto;
        max-width: 100%;
        display: block;
        object-fit: cover;
      }
    }

    // Add spacing between content elements
    p {
      margin-bottom: 10px;
    }

    h3 {
      margin: 10px 0;
    }

    .posted-by {
      margin-top: 15px;
    }

    .tags {
      display: inline;

      a {
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // Invert theme styling
  .invert-theme {
    .title h2 {
      color: white !important;
    }

    .blog-article {
      a {
        color: white !important;
      }

      p {
        color: white !important;
      }

      .tags a {
        color: $black !important;
      }

      .posted-by {
        color: $black !important;
      }
    }

    // Button styling for inverted theme
    .button {
      background-color: white !important;
      color: #0b4ddb !important;
      border: 1px solid white !important;

      &:hover {
        background-color: rgba(255, 255, 255, 0.9) !important;
      }
    }

    // Pagination dots
    .swiper-pagination-bullet {
      background-color: white !important;
      opacity: 0.5;

      &.swiper-pagination-bullet-active {
        opacity: 1;
      }
    }
  }
</style>
