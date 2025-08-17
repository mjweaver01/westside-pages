<template>
  <header
    class="site-header"
    :class="{ 'invert-header': invertHeader, 'menu-open': isMenuOpen, sticky: isSticky }"
  >
    <div class="max-width">
      <nav class="header-nav">
        <div class="logo">
          <a href="/">
            <img src="/logo.png" alt="Westside Barbell" width="40" height="40" />
          </a>
        </div>

        <ul class="nav-links">
          <li v-for="link in NAVIGATION_LINKS" :key="link.text">
            <a :href="link.url" class="nav-link" :class="{ active: isLinkActive(link.url) }">{{
              link.text
            }}</a>
          </li>
        </ul>

        <div class="hamburger-menu">
          <HamburgerMenu :is-active="isMenuOpen" @toggle="toggleMenu" />
        </div>
      </nav>

      <div v-if="isMenuOpen" class="mobile-menu">
        <a
          href="/"
          @click="closeMenu"
          class="mobile-nav-link"
          :class="{ active: isLinkActive('/') }"
          >Home</a
        >
        <a
          v-for="link in NAVIGATION_LINKS"
          :key="link.text"
          :href="link.url"
          @click="closeMenu"
          class="mobile-nav-link"
          :class="{ active: isLinkActive(link.url) }"
          >{{ link.text }}</a
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  import HamburgerMenu from '@/components/nav/HamburgerMenu.vue'
  import { NAVIGATION_LINKS } from '@/utils/constants'

  interface Props {
    invertHeader?: boolean
    currentPath?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    invertHeader: false,
    currentPath: '/',
  })

  const isMenuOpen = ref(false)
  const isSticky = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const isLinkActive = (linkUrl: string) => {
    return props.currentPath === linkUrl
  }

  // @NOTE in BaseLayout.astro, we set the heights explicitly
  const headerHeight = computed(() => {
    return document.querySelector('.site-header')?.clientHeight
  })

  const handleScroll = () => {
    // Set sticky state based on scroll position
    isSticky.value = window.scrollY > (headerHeight?.value ?? 5)
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    // Check initial scroll position
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style lang="scss" scoped>
  @use '@/scss/variables.scss' as *;
  @use '@/scss/header.scss' as *;

  .site-header {
    background: $white;
    position: absolute !important;
    top: 0;
    z-index: 999;
    width: 100%;
    transition: background-color 0.3s ease;
  }

  // Hide header in iframe mode
  html.iframe-mode .site-header {
    display: none !important;
  }

  .header-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;

    @media (min-width: $desktop) {
      padding: 1rem 0;
    }
  }

  .logo {
    display: flex;

    a {
      display: flex;
    }

    img {
      height: 40px;
      width: auto;
    }
  }

  .nav-links {
    display: none;
    list-style: none;
    gap: 2rem;

    @media (min-width: $tablet) {
      display: flex;
    }
  }

  .nav-link {
    text-decoration: none;
    color: $black;
    font-weight: 500;
    transition: color 0.25s;

    &:hover,
    &.active {
      color: $primary-color;
    }
  }

  .hamburger-menu {
    display: block;
    margin-right: -0.75rem;

    @media (min-width: $tablet) {
      display: none;
    }
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;

    @media (min-width: $tablet) {
      display: none;
    }
  }

  .mobile-nav-link {
    text-decoration: none;
    color: $black;
    font-weight: 500;
    padding: 0.5rem 0;

    &:hover,
    &.active {
      color: $primary-color;
    }
  }

  .invert-header {
    background: transparent;
    box-shadow: none;

    .logo img {
      filter: brightness(0) invert(1);
    }

    a,
    :deep(a) {
      color: $white;

      &:hover,
      &.active {
        color: $primary-color;
      }
    }

    :deep(.hamburger:not(.open) .lines),
    :deep(.hamburger:not(.open) .lines::before),
    :deep(.hamburger:not(.open) .lines::after) {
      background: $white !important;
    }
  }

  .invert-header.menu-open {
    background: $black;
  }
</style>
