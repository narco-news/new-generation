<script lang="ts" setup>
import { useMotion } from '@vueuse/motion'
const el = ref<HTMLElement>()
const { stop } = useMotion(el, {
  initial: {
    opacity: 0,
    y: -40,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 300,
      duration: 500,
      onComplete: () => stop(),
    },
  },
})
</script>

<template>
  <div ref="el">
    <slot />
  </div>
</template>
