<script lang="ts" setup>
import { useMotion } from '@vueuse/motion'
const el = ref<HTMLElement>()
const { stop } = useMotion(el, {
  initial: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
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
