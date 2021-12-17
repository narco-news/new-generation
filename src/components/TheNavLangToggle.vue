<script setup lang="ts">
import { DEFAULT_LOCALE, SUPPORTED_LOCALES as locales } from '~/locales'
const { t, locale } = useI18n()
const route = useRoute()
const toggleLocales = () => {
  // change to some real logic
  const nextLocale
    = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  const base = nextLocale === DEFAULT_LOCALE ? '' : `/${nextLocale}`
  window.location.pathname = base + route.fullPath
}
</script>

<template>
  <button class="lang-toggle" :title="t('nav.toggle_langs')" @click="toggleLocales">
    <span v-if="locale === 'es'">English</span>
    <span v-else>Spanish</span>
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
