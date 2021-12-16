<script setup lang="ts">
import { ref } from 'vue'
const lang = ref('Spanish')
function langToggle() {
  if (lang.value === 'English')
    return lang.value = 'Spanish'
  else
    return lang.value = 'English'
}
</script>

<template>
  <button class="lang-toggle" @click="langToggle()">
    {{ lang }}
  </button>
</template>

<style lang="postcss" scoped>
.lang-toggle {
  display: grid;
  place-content: center;
  background: none;
  border: 1px solid black;
  padding: 10px;
  border-radius: 6px;
  color: black;
  cursor: pointer;
}

html.dark {
  & .lang-toggle {
    border-color: white;
    color: white;
  }
}
</style>
