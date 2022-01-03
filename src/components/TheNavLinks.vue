<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="the-nav__links-wrapper">
    <router-link to="/" class="the-nav__link">
      {{ t('nav.home') }}
    </router-link>
    <router-link to="/library" class="the-nav__link">
      {{ t('nav.library') }}
    </router-link>
    <router-link to="/articles" class="the-nav__link">
      {{ t('nav.articles') }}
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.the-nav__links-wrapper {
  @media (max-width: 810px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.the-nav__link {
  color: black;
  text-decoration: none;
  margin: 0 5px;
  /* padding: 10px 0; */
  border-bottom: 2px solid transparent;
  padding-bottom: 20px;
  transition: color 180ms ease-in;
  @media (max-width: 810px) {
    padding-bottom: 0;
    border-bottom: 0;
    border-top: 2px solid transparent;
    padding-top: 10px;
  }
  &.router-link-active {
    border-color: var(--green);
    @media (max-width: 810px) {
      border-color: var(--green);
    }
    &:hover {
      color: black;
    }
  }
  &:first-of-type {
    border-color: transparent;
  }
  &:hover {
    color: var(--green);
  }
}

html.dark {
  .the-nav__link {
    color: white;
    &.router-link-active {
      &:hover {
        color: white;
      }
    }
    &:hover {
      color: var(--green);
    }
  }
}
</style>
