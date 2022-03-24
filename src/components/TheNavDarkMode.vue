<script setup lang="ts">
import { isDark, toggleDark } from '../composables'
const { t } = useI18n()
// CSS values
const textColor = ref('var(--slate-700)');
const borderColor = ref('var(--slate-400)');
const borderWidth = ref('1px');

// toggleDark helper function
function tDark() {
  textColor.value = 'var(--green)'
  borderColor.value = 'var(--green)'
  borderWidth.value = '2px'
  toggleDark()
  setInterval(() => {
    textColor.value = 'inherit'
    borderColor.value = 'var(--slate-400)'
    borderWidth.value = '1px'
  }, 2500);
}
</script>

<template>
  <button
    class="dark-mode-button"
    :aria-label="t('nav.toggle_dark')"
    :title="t('nav.toggle_dark')"
    @click="tDark()"
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
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  transition: all 180ms ease-in-out;
  color: v-bind(textColor);
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 0 0 v-bind(borderWidth) v-bind(borderColor);
  padding: 8px;
  margin-top: 0.5rem;
  &:hover {
    color: var(--green);
    box-shadow: 0 0 0 v-bind(borderWidth) v-bind(borderColor);
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
    color: white;
    box-shadow: 0 0 0 v-bind(borderWidth) v-bind(borderColor);
  }
}
</style>
