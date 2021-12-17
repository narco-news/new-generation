<script setup lang="ts">
import { isDark, toggleDark } from '../composables'
const { t } = useI18n()
</script>

<template>
  <button class="dark-mode-button" :title="t('nav.toggle_dark')" @click="toggleDark()">
    <img v-if="!isDark" src="../assets/moon.svg">
    <img v-else src="../assets/sun.svg">
  </button>
</template>

<style lang="postcss" scoped>
.dark-mode-button {
  display: grid;
  place-content: center;
  background: none;
  border: 1px solid black;
  padding: 9px 10px;
  border-radius: 6px;
  cursor: pointer;
  & img {
    width: 20px;
    height: 20px;
  }
}

html.dark {
  & .dark-mode-button {
    border-color: white;
  }
}
</style>
