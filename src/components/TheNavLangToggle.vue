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
  <button
    class="the-nav__lang-toggle"
    :title="t('nav.toggle_langs')"
    @click="toggleLocales"
  >
    <span v-if="locale === 'es'">English</span>
    <span v-else>Español</span>
  </button>
</template>

<style lang="postcss" scoped>
.the-nav__lang-toggle {
  display: grid;
  place-content: center;
  background: none;
  border: none;
  padding: 1px;
  margin: 0;
  align-self: flex-end;
  margin-left: 2em;
  span {
    font-size: 12px;
    font-family: monospace;
    font-weight: 500;
    color: black;
    border-radius: 8px;
    box-shadow: 0 0 0 1px black;
    padding: 8px;
    transition: box-shadow 180ms ease-in;
    &:hover {
      box-shadow: 0 0 0 2px var(--green);
    }
  }
}

html.dark {
  .the-nav__lang-toggle {
    span {
      color: white;
      box-shadow: 0 0 0 1px white;
    }
  }
}
</style>
