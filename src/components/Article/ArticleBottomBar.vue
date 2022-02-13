<script setup lang="ts">
const props = defineProps<{
  title: string
  primaryAuthor: {}
  slug: string
  firstTag?: {}
  secondTag?: {}
}>()

const source = ref(`https://narco.news/articles/${props.slug}`)
const { copy, copied } = useClipboard({ source })

// Bottom bar
const width = ref(0)
const { y } = useWindowScroll()

function scrollHandler() {
  const height
    = document.documentElement.scrollHeight
    - document.documentElement.clientHeight
  width.value = (window.scrollY / height) * 100
}
tryOnMounted(() => {
  const wrapperHeight = document.getElementsByClassName('article-meta__wrapper')[0].clientHeight
  const imageHeight = document.getElementsByClassName('article-image__wrapper')[0].clientHeight
  const minusHeight = imageHeight + wrapperHeight
  window.addEventListener('scroll', scrollHandler)
  watchEffect(() => {
    const height
    = document.documentElement.scrollHeight
    - document.documentElement.clientHeight
    if (y.value >= minusHeight)
      window.dispatchEvent(new Event('scroll'))
  })
})
tryOnUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div class="wrapper">
    <div class="bottom-bar">
      <div class="progress-bar">
        <div class="percent" :style="`width: ${width}%`" />
      </div>
      <!-- <div class="bottom-bar__content">
        <div class="bottom-bar__meta">
          {{ props.title }}
          <div class="tags">
            <router-link :to="`/tags/${props.firstTag?.slug}`" class="tag">
              {{ props.firstTag?.name }}
            </router-link>
            <router-link :to="`/tags/${props.secondTag?.slug}`" class="tag">
              {{ props.secondTag?.name }}
            </router-link>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  height: auto;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 500;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
.bottom-bar {
  width: 100%;
  max-width: 900px;
  perspective: 20px;
  overflow: hidden;
  background-color: var(--slate-100);
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px; */
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  @media (min-width: 1024px) {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .progress-bar {
    width: 100%;
    max-width: 985px;
    background-color: transparent;

    .percent {
      height: 0.2em;
      background-color: var(--green);
    }
  }

  .bottom-bar__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.5rem 1rem 0.5rem;

    .bottom-bar__meta {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      font-family: 'Oswald';
      font-weight: 400;
      .tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 10px;
      }
      a {
        font-size: 12px;
        margin-right: 0.5rem;
        font-family: sans-serif;
        color: var(--green);
        text-decoration: none;
        border-bottom: 1px dotted var(--green);
        display: inline-flex;
        white-space: nowrap;
        align-self: flex-end;
      }
      .bottom-bar__title {
        padding: 0;
        margin: 0;
        font-size: clamp(100%, 1rem + 2vw, 32px);
        color: black;
        font-weight: 400;
        display: inline-flex;
      }
      .meta__author {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: var(--green);
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }

    .scroll-top {
      display: grid;
      place-content: center;
      background: none;
      border: none;
      -webkit-tap-highlight-color: transparent;
      color: black;
      border-radius: 100%;
      padding: 10px;
      overflow: hidden;
      border: 1px solid black;
      box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
      margin-right: 1em;
      svg {
        width: 15px;
        height: 15px;
        filter: brightness(0);
      }
      @media (max-width: 768px) {
        margin-right: 0.5rem;
      }
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

html.dark {
  .bottom-bar {
    background-color: #161618;
    .bottom-bar__content {
      .bottom-bar__meta {
        color: white;
      }
      .scroll-top {
        border-color: white;
        color: red;
      }
    }
  }
}
</style>
