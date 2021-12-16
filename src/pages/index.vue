<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'Home | narco.news',
})
</script>

<template>
  <section />
</template>

<style lang="postcss" scoped>
section {
    margin: 2em 0;
}
html.dark {
  & h1 {
    color: white;
  }
}
</style>
