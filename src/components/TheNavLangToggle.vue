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
  background: none;
  border: 1px solid black;
  border-radius: 6px;
  outline: 2px solid transparent;
  font-size: small;
  padding: 0.5em 1em;
  &:hover {
    border-color: transparent;
    outline-color: #eb5757;
  }
  &:focus {
    border-color: transparent;
    outline-color: #eb5757;
  }
}
html.dark {
  & .lang-toggle {
    color: white;
    border-color: white;
    &:hover {
      border-color: transparent;
      outline-color: #f06b84;
    }
    &:focus {
      border-color: transparent;
      outline-color: #f06b84;
    }
  }
}
</style>
