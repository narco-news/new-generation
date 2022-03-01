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
      <moon-color-icon v-if="!isDark" alt="Moon" />
      <sun-color-icon v-else alt="Sun" />
    </transition>
  </button>
</template>

<style lang="postcss" scoped>
.dark-mode-button {
  display: grid;
  place-content: center;
  background: none;
  border: none;
  padding: 8px;
  margin: 0.5rem 0;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--slate-400);
  transition: all 180ms ease-in;
  color: var(--slate-700);
  &:hover {
    color: var(--green);
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
  .dark-mode-button {
    color: var(--slate-200);
    box-shadow: 0 0 0 1px var(--slate-500);
    &:hover {
      color: var(--green-400);
      box-shadow: 0 0 0 2px var(--green-400);
    }
  }
}
</style>
