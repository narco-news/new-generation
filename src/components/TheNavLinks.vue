<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <router-link to="/">
    {{ t('nav.home') }}
  </router-link>
  <router-link to="/library">
    {{ t('nav.library') }}
  </router-link>
  <router-link to="/articles">
    {{ t('nav.articles') }}
  </router-link>
</template>

<style lang="postcss" scoped>
a {
  text-decoration: none;
  font-size: large;
  color: black;
  display: flex;
  flex-wrap: none;
  justify-content: center;
  display: inline-flex;
  padding: 0.5em 0.5em 1.2em 0.5em;
  border-bottom: 3px solid transparent;

  @media (max-width: 810px) {
    border-top: 3px solid transparent;
  }
  &:hover {
    color: #eb5757;
  }
  &:focus {
    outline-color: #eb5757;
  }
  &.router-link-active {
    border-bottom: 3px solid #eb5757;
    color: #eb5757;
    &:nth-child(1) {
      color: black;
      border-color: transparent;
    }

    @media (max-width: 810px) {
      border-top: 3px solid #eb5757;
      border-bottom: none;
    }
  }
}

html.dark {
  a {
    color: white;
    &.router-link-active {
      color: #eb5757;
      &:nth-child(1) {
        color: white;
      }
    }
  }
}
</style>
