<template>
  <header class="site-header">
    <div class="max-width">
      <nav class="header-nav">
        <div class="logo">
          <RouterLink to="/">
            <img src="/logo.svg" alt="Westside Barbell" />
          </RouterLink>
        </div>

        <ul class="nav-links">
          <li>
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/about" class="nav-link">About</RouterLink>
          </li>
        </ul>

        <div class="hamburger-menu">
          <HamburgerMenu :is-active="isMenuOpen" @toggle="toggleMenu" />
        </div>
      </nav>

      <div v-if="isMenuOpen" class="mobile-menu">
        <RouterLink to="/" @click="closeMenu" class="mobile-nav-link">Home</RouterLink>
        <RouterLink to="/about" @click="closeMenu" class="mobile-nav-link">About</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import HamburgerMenu from './HamburgerMenu.vue'

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

  .site-header {
    background: $white;
    box-shadow: $header-shadow;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .logo img {
    height: 40px;
    width: auto;
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
    &.router-link-active {
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

    &:hover,
    &.router-link-active {
      color: $primary-color;
    }
  }
</style>
