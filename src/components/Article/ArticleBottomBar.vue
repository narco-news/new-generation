<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
const props = defineProps<{
  title: string
  primaryAuthor: {}
}>()
const width = ref(0)
const visible = ref()
onMounted(() => {
  window.addEventListener('scroll', scrollHandler)
  window.addEventListener('scroll', scrollListener)
  window.dispatchEvent(new Event('scroll'))
})
onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
  window.addEventListener('scroll', scrollListener)
})

function scrollHandler() {
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  width.value = (window.scrollY / height) * 100
}
function scrollToTop() {
  const intervalId = setInterval(() => {
    if (window.pageYOffset === 0)
      clearInterval(intervalId)

    window.scroll(0, window.pageYOffset - 50)
  }, 20)
}

function scrollListener(e) {
  visible.value = window.scrollY > 400
}
</script>

<template>
  <div class="bottom-bar">
    <div class="progress-bar">
      <div class="percent" :style="`width: ${width}%`" />
    </div>
    <div class="bottom-bar__meta">
      <div class="meta__article-info">
        <p class="meta__title">
          {{ props.title }}
        </p>
        <em>&nbsp; by &nbsp;</em>
        <p class="meta__author">
          {{ props.primaryAuthor.name }}
        </p>
      </div>
      <div class="buttons">
        <button class="dark-mode-button" @click="toggleDark()">
          <transition name="slide" mode="out-in">
            <moon-icon v-if="!isDark" />
            <sun-icon v-else />
          </transition>
        </button>
        <button class="dark-mode-button" @click="scrollToTop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="#000000"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="17 11 12 6 7 11" />
            <line x1="12" y1="18" x2="12" y2="6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.bottom-bar {
  background-color: rgba(255, 255, 255, 0.589);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  height: 45px;
  width: 100%;
  max-width: 985px;
  position: fixed;
  bottom: 0;
  z-index: 500;

  .progress-bar {
    width: 100%;
    max-width: 985px;
    background-color: transparent;

    .percent {
      height: 0.2em;
      background-color: var(--green);
    }
  }

  .bottom-bar__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .meta__article-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: "Oswald";
      font-weight: 400;
      .meta__title {
        padding: 0;
        margin: 0;
      }
      .meta__author {
        padding: 0;
        margin: 0;
      }
    }

    .buttons {
      display: flex;
      flex-wrap: none;
    }

    .dark-mode-button {
      display: grid;
      place-content: center;
      background: none;
      border: none;
      color: black;
      -webkit-tap-highlight-color: transparent;
      border-radius: 6px;
      padding: 6px;
      overflow: hidden;
      border: 1px solid black;
      box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
      margin-right: 0.5em;
    }
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
</style>
