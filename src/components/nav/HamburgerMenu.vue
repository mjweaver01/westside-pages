<template>
  <div @click="toggle" class="hamburger" :class="{ open: isActive }">
    <div class="lines"></div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    isActive: boolean
  }

  interface Emits {
    (e: 'toggle'): void
  }

  defineProps<Props>()
  const emit = defineEmits<Emits>()

  const toggle = () => {
    // Emit toggle event to parent
    emit('toggle')
  }
</script>

<style lang="scss">
  @use '@/scss/hamburger.scss';
</style>
