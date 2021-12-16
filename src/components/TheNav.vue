<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useWindowScroll } from '@vueuse/core'
const { y } = useWindowScroll()
const shadowStyle = ref('')
watchEffect(() => {
  if (y.value > 100)
    shadowStyle.value = 'box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;'
  else
    shadowStyle.value = ''
})
</script>
<template>
  <nav class="nav" :style="shadowStyle">
    <div class="nav__left">
      <router-link to="/" class="nav-left__logo">
        narco.news
      </router-link>
    </div>
    <div class="nav__right">
      <div class="right__links">
        <TheNavLinks />
      </div>
      <div class="right__buttons">
        <TheNavLangToggle />
        <TheNavDarkMode />
      </div>
    </div>
  </nav>
  <!-- Mobile bottom links -->
  <div class="mobile-bottom-links">
    <TheNavLinks />
  </div>
</template>

<style lang="postcss" scoped>
.mobile-bottom-links {
  display: flex;
  justify-content: center;
  margin-top: 0.5em;
  ::v-deep(a) {
    font-size: small;
  }
  @media (min-width: 426px) {
    display: none;
  }
}
nav {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.753);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  z-index: 500;
  transition: background-color 0.2s ease-in-out;
  border-bottom: 1px solid black;
  padding-top: 1em;
  & .nav__left {
    font-size: x-large;
    padding-left: 0.3em;
    padding-top: 5px;
    & .nav-left__logo {
      color: black;
      text-decoration: none;
      -webkit-tap-highlight-color: none;
      border: none;
      outline: none;
      cursor: none;
      &:hover {
        outline: none;
        background: #eb5757;
        background: -webkit-linear-gradient(
          to right,
          #eb5757 0%,
          #f2994a 45%,
          #f2c94c 100%
        );
        background: -moz-linear-gradient(
          to right,
          #eb5757 0%,
          #f2994a 45%,
          #f2c94c 100%
        );
        background: linear-gradient(
          to right,
          #eb5757 0%,
          #f2994a 45%,
          #f2c94c 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &:focus {
        outline: none;
        background: #eb5757;
        background: -webkit-linear-gradient(
          to right,
          #eb5757 0%,
          #f2994a 45%,
          #f2c94c 100%
        );
        background: -moz-linear-gradient(
          to right,
          #eb5757 0%,
          #f2994a 45%,
          #f2c94c 100%
        );
        background: linear-gradient(
          to right,
          #eb5757 0%,
          #f2994a 45%,
          #f2c94c 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        outline-color: #eb5757;
      }
    }
  }
  & .nav__right {
    display: flex;
    & .right__links {
      margin-right: 2em;
      @media (max-width: 425px) {
        display: none;
      }
    }
    & .right__buttons {
      display: flex;
      align-items: center;
      & button {
        margin: 0 0.5em 1em 0.5em;
      }
    }
  }
}
/*
  Dark mode styles
*/
html.dark {
  & nav {
    background-color: #161618;
    border-bottom-color: white;

    & .nav__left {
      & a {
        color: white;
      }
    }
  }
}
</style>
