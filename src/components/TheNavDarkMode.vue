<script setup lang="ts">
import { isDark, toggleDark } from '../composables'
</script>

<template>
  <button class="dark-mode-button" @click="toggleDark()">
    <img v-if="!isDark" src="../assets/moon.svg">
    <img v-else src="../assets/sun.svg">
  </button>
</template>

<style lang="postcss" scoped>
.dark-mode-button {
  background: none;
  border: none;
  & img {
    height: 20px;
    width: 20px;
  }
}

html.dark {
  & button {
    border: none;
  }
}
</style>
