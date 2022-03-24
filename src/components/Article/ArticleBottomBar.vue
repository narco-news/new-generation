<script lang="ts" setup>
defineProps<{
  titleVisibility: boolean | undefined
  bottomVisibility: boolean | undefined
}>()
// Progress bar
const width = ref(0)
function scrollHandler() {
  const metaHeight = document.getElementsByClassName('article-meta__wrapper')[0]?.scrollHeight
  const imageHeight = document.getElementsByClassName('article-image__wrapper')[0]?.scrollHeight
  const contentHeight = document.getElementsByClassName('article__content-wrapper')[0]?.scrollHeight + imageHeight + metaHeight
  const height = contentHeight - document.documentElement.clientHeight
  width.value = (window.scrollY / height) * 100
}
tryOnMounted(() => {
  watchEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    window.dispatchEvent(new Event('scroll'))
  })
})
tryOnBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div class="bottom-bar-wrapper">
    <!--  -->
    <Transition name="slide-fade" appear>
      <div v-if="!bottomVisibility && !titleVisibility" class="article-bottom-bar">
        <div class="progress-bar">
          <div class="percent" :style="`width: ${width}%`" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
.bottom-bar-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 4px;
  width: 100%;
}

.progress-bar {
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  .percent {
    height: 4px;
    background-color: var(--green);
    opacity: 85%;
  }
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.slide-right-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-leave-active {
  /* transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0.3s ease-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

html.dark {
  .percent {
    background-color: var(--green-400);
  }
}
</style>
