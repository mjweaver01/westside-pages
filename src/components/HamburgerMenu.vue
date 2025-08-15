<template>
  <button @click="toggle" class="hamburger" :class="{ active: isActive }">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>
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

<style lang="scss" scoped>
  @use '@/scss/variables.scss' as *;

  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    &:focus {
      outline: none;
    }

    .hamburger-line {
      width: 30px;
      height: 3px;
      background: $black;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
    }

    &.active {
      .hamburger-line {
        &:first-child {
          transform: rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }

        &:nth-child(3) {
          transform: rotate(-45deg);
        }
      }
    }
  }
</style>
