<script lang="ts" setup>
import { Article } from '~/ghostTypes'
const props = defineProps<{
  article: Article
  titleVisibility: boolean
}>()
// Progress bar
const { y } = useWindowScroll()
const width = ref(0)
function scrollHandler() {
  // console.log(document.getElementsByClassName('article__content')[0])
  // const height = document.getElementsByClassName('article__content')[0].scrollHeight - document.documentElement.clientHeight
  const height = document.getElementsByClassName('article__content')[0].scrollHeight - document.documentElement.clientHeight
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
// Share box
const showShareBox = ref(false)
// Copy
const source = ref(`https://narco.news/articles/${props.article.slug}`)
const options = {
  copiedDuring: 5000,
  source: source.value,
}
const { copy, copied } = useClipboard(options)
</script>

<template>
  <div class="article-bottom-bar-wrapper">
    <Transition name="slide-fade" appear>
      <div v-if="!titleVisibility" class="article-bottom-bar">
        <div class="article-bottom-bar-content">
          <p class="article-bottom-bar__title">
            {{ article.title }}
          </p>
          <div class="article-bottom-bar-share-buttons">
            <share-link-icon v-if="!copied" @click="copy()" />
            <check-icon v-else />
            <share-icon @click="showShareBox = !showShareBox" />
          </div>
        </div>
        <div class="progress-bar">
          <div class="percent" :style="`width: ${width}%`" />
        </div>
      </div>
    </Transition>
    <Transition name="slide-right">
      <div v-if="showShareBox" class="share-box">
        <a
          :href="`https://twitter.com/share?text=&quot;${props.article.title}&quot;&url=https://narco.news/articles/${props.article.slug}`"
          onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
          target="_blank"
        >
          <twitter-color-icon />
        </a>
        <a
          :href="`https://www.facebook.com/sharer.php?u=https://narco.news/articles/${props.article.slug}`"
          onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
          target="_blank"
        >
          <facebook-icon />
        </a>
      </div>
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
.article-bottom-bar-wrapper {
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.article-bottom-bar {
  width: 100%;
  max-width: 1000px;
  background-color: var(--slate-300);
  padding: 0 0.5rem 0.5rem 0.5rem;
  border-top: 1px solid black;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  .article-bottom-bar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .article-bottom-bar__title {
      font-family: 'Oswald';
      font-weight: 400;
      color: var(--slate-700);
      padding: 0.5rem 0;
      margin: 0;
    }
    .article-bottom-bar-share-buttons {
      display: flex;
      flex-wrap: nowrap;
      padding-top: 4px;
      svg {
        width: 15px !important;
        height: 15px !important;
      }
    }
  }
}

.progress-bar {
  width: 100%;
  background-color: transparent;
  .percent {
    height: 5px;
    background-color: var(--green);
    border-radius: 4px;
  }
}

.share-box {
  position: absolute;
  top: -65px;
  right: 0;
  background-color: var(--slate-300);
  font-size: 12px;
  font-family: monospace;
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  box-shadow: 0 0 0 1px var(--slate-700);
  a {
    color: var(--green);
    margin: 0 1rem;
    padding: 0;
  }
  button {
    background: none;
    border: none;
    color: var(--green);
    padding: 0;
    margin: 0 1rem;
  }
  svg {
    height: 15px !important;
    width: 15px !important;
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
  .article-bottom-bar {
    background-color: #161618;
    color: white;
    .article-bottom-bar-content {
      .article-bottom-bar__title {
        color: var(--slate-200);
      }
    }
  }
  .share-box {
    background-color: #161618;
  }
}
</style>
