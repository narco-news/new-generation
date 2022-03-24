<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="the-nav__links-wrapper">
    <router-link to="/" class="the-nav__link">
      {{ t('nav.home') }}
    </router-link>
    <!-- <router-link to="/resources" class="the-nav__link">{{ t('nav.resources') }}</router-link> -->
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
  margin: 0 var(--space-2xs);
  /* padding: 10px 0; */
  border-bottom: 2px solid transparent;
  padding-bottom: 21px;
  transition: color 180ms ease-in;
  -webkit-tap-highlight-color: transparent;
  font-family: var(--font-normal);
  font-size: var(--step--1);
  @media (max-width: 810px) {
    padding-bottom: 0;
    border-bottom: 0;
    border-top: 2px solid transparent;
    padding: 10px 10px 0 10px;
    font-size: var(--step--2);
  }
  &.router-link-active {
    border-color: var(--green);
    color: var(--green);
    font-weight: 500;
  }
  &:first-of-type {
    border-color: transparent;
    &.router-link-active {
      color: black;
    }
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
    &:first-of-type {
      &.router-link-active {
        color: white;
      }
    }
    &:hover {
      color: var(--green);
    }
  }
}
</style>
