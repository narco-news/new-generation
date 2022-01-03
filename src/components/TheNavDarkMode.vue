<script setup lang="ts">
import { isDark, toggleDark } from '../composables'
const { t } = useI18n()
</script>

<template>
  <button
    class="dark-mode-button"
    :aria-label="t('nav.toggle_dark')"
    :title="t('nav.toggle_dark')"
    @click="toggleDark()"
  >
    <transition name="slide" mode="out-in">
      <moon-color-icon v-if="!isDark" src="../assets/moon.svg" alt="Moon" />
      <sun-color-icon v-else alt="Sun" />
    </transition>
  </button>
</template>

<style lang="postcss" scoped>
.dark-mode-button {
  display: grid;
  place-content: center;
  background: none;
  /* border: 1px solid black; */
  border: none;
  padding: 9px 10px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  /* border: 1px solid black; */
  box-shadow: 0 0 0 1px black;
  transition: box-shadow 180ms ease-in;
  &:hover {
    box-shadow: 0 0 0 2px var(--green);
  }
  & img {
    width: 20px;
    height: 20px;
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
}

html.dark {
  & .dark-mode-button {
    box-shadow: 0 0 0 1px white;
    color: white;
  }
}
</style>
