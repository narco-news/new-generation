<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>
<template>
  <nav class="nav">
    <router-link to="/" class="nav__title">
      narco.news
    </router-link>
    <div class="nav__links">
      <button class="dark-mode-button" @click="toggleDark()">
        <transition name="slide" mode="out-in">
          <moon-icon v-if="!isDark" />
          <sun-icon v-else />
        </transition>
      </button>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  z-index: 100;
  width: 100%;
  max-width: 985px;
  height: 40px;
  padding: 10px;
  margin-top: 0.5em;

  & .nav__title {
    color: inherit;
    font-size: 16px;
    text-decoration: none;
    background-color: var(--slate-50);
    -webkit-tap-highlight-color: transparent;
    border-radius: 6px;
    padding: 8px;
    border: 1px solid black;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  }

  & .dark-mode-button {
    display: grid;
    place-content: center;
    background: none;
    border: none;
    color: inherit;
    background-color: var(--slate-50);
    -webkit-tap-highlight-color: transparent;
    border-radius: 6px;
    padding: 8px;
    overflow: hidden;
    border: 1px solid black;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  }
}
/*
  Credit to Máximo Mussini for transition
  https://github.com/ElMassimo/iles/blob/main/docs/src/components/DarkModeSwitch.vue
   */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.15s ease-out;
}
.slide-enter-from {
  transform: translateY(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 100;
}

html.dark {
  & .dark-mode-button {
    /* border-color: white; */
    border: none;
    background-color: black;
    color: white;
    border-color: white;
  }

  .nav__title {
    background-color: black;
    color: white;
    border-color: white;
  }
}
</style>
