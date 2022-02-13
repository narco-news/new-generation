<script setup lang="ts">
import { useMotion, useMotionControls, useMotionProperties } from '@vueuse/motion'
import { Article } from '~/ghostTypes'
const props = defineProps<{
  article?: Article
}>()
const options = {
  copiedDuring: 7000,
}
const source = ref(`https://narco.news/articles/${props.article.posts[0].slug}`)
const { copy, copied } = useClipboard({ source }, options)

const buttonBoxShadow = ref('0 0 0 1px var(--slate-300)')
function clicked() {
  copy()
  buttonBoxShadow.value = '0 0 0 2px var(--green-400)'
  useTimeoutFn(() => {
    buttonBoxShadow.value = '0 0 0 1px var(--slate-300)'
  }, 1500)
}

//
// Scroll to top button
function scrollToTop() {
  const intervalId = setInterval(() => {
    if (window.pageYOffset === 0) clearInterval(intervalId)

    window.scroll(0, window.pageYOffset - 50)
  }, 20)
}
const shareButtons = ref<HTMLElement>()
const { stop } = useMotion(shareButtons, {
  initial: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 300,
      duration: 500,
      onComplete: () => stop(),
    },
  },
})
</script>

<template>
  <div class="bottom-share-buttons">
    <div
      ref="shareButtons"
      style="display: flex;align-items:center"
    >
      <span
        style="font-size: 12px;color:var(--slate-500);margin-right:0.5rem"
      >SHARE:</span>
      <a
        :href="`https://twitter.com/share?text=&quot;${article.posts[0].title}&quot;&url=https://narco.news/articles/${article.posts[0].slug}`"
        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
        target="_blank"
        class="icon"
      >
        <twitter-icon />
      </a>
      <a
        :href="`https://www.facebook.com/sharer.php?u=https://narco.news/articles/${article.posts[0].slug}`"
        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
        target="_blank"
        class="icon"
      >
        <facebook-icon />
      </a>
      <button
        class="copy-icon"
        @click="clicked()"
      >
        <check-icon v-if="copied" style="color:var(--green-400)" />
        <link-icon v-else />
      </button>
    </div>
    <visible-right>
      <button
        ref="scrollTopButton"
        class="icon"
        @click="scrollToTop()"
      >
        <up-arrow-icon />
      </button>
    </visible-right>
  </div>
</template>

<style lang="postcss" scoped>
.bottom-share-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;
    padding-top: 1.5rem;
    .icon {
        color: var(--slate-700);
        background: none;
        border: none;
        display: grid;
        place-content: center;
        border-radius: 100%;
        box-shadow: 0 0 0 1px var(--slate-300);
        margin: 0 0.5rem;
        padding: 10px;
        transition: all 180ms ease-in-out;
        &:hover {
            color: var(--green);
            box-shadow: 0 0 0 2px var(--green);
        }
        svg {
            width: 15px;
            height: 15px;
            @media(min-width: 768px) {
                width: 20px;
                height: 20px;
            }
        }
    }
    .copy-icon {
        color: var(--slate-700);
        background: none;
        border: none;
        display: grid;
        place-content: center;
        border-radius: 100%;
        box-shadow: v-bind(buttonBoxShadow);
        margin: 0 0.5rem;
        padding: 10px;
        transition: all 180ms ease-in-out;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        svg {
            width: 15px;
            height: 15px;
            @media(min-width: 768px) {
                width: 20px;
                height: 20px;
            }
        }
    }
}

html.dark {
    .bottom-share-buttons {
        .icon {
            color: white;
            &:hover {
                color: var(--green-400);
                box-shadow: 0 0 0 2px var(--green-400);
            }
        }
        .copy-icon {
            color: white;
        }
    }
}
</style>
