<template>
  <header
    v-if="!isIframeMode"
    class="site-header"
    :class="{ 'invert-header': invertHeader, 'menu-open': isMenuOpen }"
  >
    <div class="max-width">
      <nav class="header-nav">
        <div class="logo">
          <a href="/">
            <img src="/logo.png" alt="Westside Barbell" />
          </a>
        </div>

        <ul class="nav-links">
          <li v-for="link in links" :key="link.text">
            <a :href="link.url" class="nav-link">{{ link.text }}</a>
          </li>
        </ul>

        <div class="hamburger-menu">
          <HamburgerMenu :is-active="isMenuOpen" @toggle="toggleMenu" />
        </div>
      </nav>

      <div v-if="isMenuOpen" class="mobile-menu">
        <a href="/" @click="closeMenu" class="mobile-nav-link">Home</a>
        <a href="/about" @click="closeMenu" class="mobile-nav-link">About</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import HamburgerMenu from './HamburgerMenu.vue'
  import { links } from '@/utils/links'
  import { detectIframeMode } from '@/utils/iframe'

  interface Props {
    invertHeader?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    invertHeader: false,
  })

  const isIframeMode = detectIframeMode()

  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }
</script>

<style lang="scss" scoped>
  @use '@/scss/variables.scss' as *;
  @use '@/scss/header.scss' as *;

  .site-header {
    background: $white;
    position: fixed !important;
    top: 0;
    z-index: 999;
    width: 100%;
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

    &:hover {
      color: $primary-color;
    }
  }

  .hamburger-menu {
    display: block;

    @media (min-width: $tablet) {
      display: none;
    }
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid $light-gray;

    @media (min-width: $tablet) {
      display: none;
    }
  }

  .mobile-nav-link {
    text-decoration: none;
    color: $black;
    font-weight: 500;
    padding: 0.5rem 0;

    &:hover {
      color: $primary-color;
    }
  }

  .invert-header:not(.menu-open) {
    box-shadow: none;

    .logo img {
      filter: brightness(0) invert(1);
    }

    a,
    :deep(a) {
      color: $white;

      &:hover {
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
    background: $white;
  }
</style>
