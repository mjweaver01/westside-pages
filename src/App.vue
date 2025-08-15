<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import FooterComponent from '@/components/FooterComponent.vue'
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    main {
      flex: 1;
    }
  }
</style>
