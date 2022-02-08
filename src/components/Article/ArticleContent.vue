<script setup lang="ts">
import { onKeyUp } from '@vueuse/core'
import reframe from 'reframe.js'
const props = defineProps<{
  content?: string
}>()
onMounted(() => {
  reframe('iframe')
})
const showModal = ref(false)
const modalImageSrc = ref('')
const modalImageCaption = ref('')
const modalImage = ref()

function largeImage(image) {
  if (image.nextElementSibling?.matches('figcaption'))
    modalImageCaption.value = image.nextElementSibling.innerHTML
  else modalImageCaption.value = ''
  modalImageSrc.value = image.src
  // modalImageCaption.value = image.offsetParent.innerHTML
  showModal.value = true
}
// // // //
// Add buttons to all single images
tryOnMounted(() => {
  // Lazy load all images
  const allImages = Array.from(document.getElementsByTagName('img'))
  allImages.forEach((image) => {
    image.loading = 'lazy'
    image.onclick = () => {
      largeImage(image)
    }
    const container = document.querySelector('.article__content')
    const allLinks = Array.from(container.querySelectorAll('a'))
    allLinks.forEach((link) => {
      // const regexLocal = /localhost/g
      const regex = /https:\/\/narco-news-ssr.vercel.app/g
      const regexDiscord = /^https:\/\/discord.gg/g
      if (!link.href.match(regex) && !link.href.match(regexDiscord)) {
        link.target = '_blank'
        link.className = `${link.className} external-link`
      }
    })
  })
})
// // // //
// Listen for the ESC key in order
// to close the modal
onKeyUp('c', () => (showModal.value = false))
// Twitter
tryOnMounted(() => {
  window.twttr = (function(d, s, id) {
    let js; const fjs = d.getElementsByTagName(s)[0]
    const t = window.twttr || {}
    if (d.getElementById(id)) return t
    js = d.createElement(s)
    js.id = id
    js.src = 'https://platform.twitter.com/widgets.js'
    fjs.parentNode.insertBefore(js, fjs)

    t._e = []
    t.ready = function(f) {
      t._e.push(f)
    }

    return t
  }(document, 'script', 'twitter-wjs'))
  window.twttr.widgets?.load()
})
</script>

<template>
  <div class="article__content-wrapper">
    <div v-if="props.content" class="article__content" v-html="props.content" />
  </div>
  <transition name="modal">
    <modal
      v-if="showModal"
      @close="showModal = false"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <img :ref="modalImage" :src="modalImageSrc" class="modalImage">
      <template #caption>
        <div class="caption-wrapper">
          <div class="modal-image-caption" v-html="modalImageCaption" />
        </div>
      </template>
    </modal>
  </transition>
</template>

<style lang="postcss" scoped>
.caption-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 14px;
  padding: 10px;
  height: auto;
  margin-bottom: 0.5rem;
  width: 75%;
  line-height: 1.5;
  font-style: italic;
  overflow: hidden;
  @media (min-width: 1024px) {
  }
  ::v-deep(.modal-image-caption) {
    a {
      text-decoration: none;
      color: var(--green);
      border-bottom: 1px dotted var(--green);
    }
  }
}
#app > main > section > div > div > div.modal-mask > div > div.modal-container > img {
  object-fit: contain;
  aspect-ratio: 1/1;
  width: 100%;
  height: 100%;
  max-height: 80vh;
  padding: 0.5rem;
  @media (min-width: 1024px) {
    padding: 0;
  }
  /* max-height: 600px; */
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/*

  ARTICLE CONTENT STYLES

*/

.article__content-wrapper {
  padding: 0 1em;
  z-index: 1;
  & .article__content {
    max-width: 85ch;
    margin: 0 auto;
    overflow: hidden;
    word-break: break-word;
  }

  & ::v-deep(.article__content) {
    font-family: 'Noto Serif';
    line-height: 1.6;
    font-weight: 400;
    overflow: hidden;

    .external-link {
      color: var(--green);
    }

    .kg-gallery-card {
      margin: 0.5em;
    }
    .kg-gallery-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.5rem;

      .kg-gallery-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        .kg-gallery-image {
          flex: 1 1 5ch;
          margin-bottom: 1rem;
          @supports (-webkit-touch-callout: none) and (not (translate: none)) {
            margin: 10px;
          }
          img {
            object-fit: cover;
            object-position: top;
            aspect-ratio: 3/2;
            width: 100%;
            height: 100%;
            border: 1px solid var(--slate-300);
            border-radius: 6px;
            @media (min-width: 1024px) {
              aspect-ratio: 16/9;
              min-height: 225px;
            }
          }
        }
      }
    }

    .kg-image-card {
      border-radius: 8px;
      padding: 1.5rem clamp(0, 5%, 3rem);
      img {
        border-radius: 6px;
        border: 1px solid var(--slate-300);
      }
    }

    h2 {
      font-size: clamp(100%, 1.5rem + 2vw, 46px);
      font-weight: 400;
      margin-top: 4rem;
    }

    a {
      color: var(--green);
      text-decoration: none;
      border-bottom: 1px dotted var(--green);
      &:hover {
        border-bottom: 1px solid var(--green);
      }
    }

    p {
      margin: 1em auto;
      max-width: 65ch;
      font-size: clamp(100%, 0.6rem + 2vw, 18px);
      color: black;
      margin-bottom: 2rem;
      a[href$='.PDF']:after {
        content: ' [PDF]';
      }
      a[href$='.pdf']:after {
        content: ' [PDF]';
      }
    }

    p:nth-child(1):not('a') {
      em {
        font-family: sans-serif;
        font-size: 14px;
        line-height: 1;
        font-weight: 400;
      }
    }

    img {
      position: relative;
      object-fit: contain;
      width: 100%;
      height: auto;
      overflow: hidden;
      margin: 0.5em 0;
      z-index: 0;
    }

    figcaption {
      font-size: 12px;
      position: relative;
      font-family: sans-serif;
      font-style: italic;
      color: var(--slate-500);
      margin: 0;
      padding: 0;
      @media (min-width: 768px) {
        font-size: 16px;
      }
    }

    figure.kg-card.kg-image-card {
      position: relative;
      margin-bottom: 2rem;
    }

    blockquote {
      font-style: italic;
      padding: 1.5rem clamp(1rem, 5%, 3rem);
      position: relative;
      font-family: sans-serif;
      font-weight: 500;
      font-size: 13px;
      background-color: var(--slate-200);
      border-radius: 4px;
      color: var(--slate-700);
      border: 1px solid var(--slate-300);
      margin: 0 5rem;
      @media (max-width: 425px) {
        /* margin: 2rem 1rem; */
        margin: 0 1rem;
      }
    }

    blockquote.atw-bq {
      margin-top: 2rem;
      border-color: var(--green);
      font-size: clamp(100%, 1rem + 2vw, 18px);
      color: var(--green);
      line-height: 1.8;
      position: relative;
      font-style: normal;
    }

    hr {
      border: none;
      height: 1px;
      background-color: var(--green);
      width: 90%;
      margin: 2rem auto;
    }

    iframe {
      border: 1px solid var(--slate-300);
      border-radius: 6px;
      padding: 1px 0;
      background: var(--slate-300);
      &.dw-chart-footer {
        background: none;
      }
    }

    .js-reframe {
      margin: 2rem 0 1rem 0;
    }

    video {
      width: 100%;
      height: auto;
    }

    .twitter-tweet.twitter-tweet-rendered {
      margin: 0 auto;
    }

    a.link-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      color: white;
      padding: 10px 20px;
      font-family: monospace;
      font-weight: 600;
      font-size: clamp(100%, 0.5rem + 2vw, 18px);
      border-bottom: none;
      -webkit-tap-highlight-color: transparent;
      background-color: var(--green);
      border-radius: 12px;
      margin: 5rem 10rem;
      &::after {
        content: 'Article Link';
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-right: 10px;
        padding: 1rem;
        white-space: nowrap;
      }
      &:hover {
        background-color: var(--slate-100);
        color: var(--green);
        box-shadow: 0 0 0 2px var(--green);
      }
      @media (max-width: 768px) {
        margin: 4rem;
      }
    }
    .warning {
      @apply font-sans;
      width: 85%;
      height: 100%;
      margin: 2rem 0em;
      padding: 0.5em 1em;
      background-color: #fce0dd;
      border-left: 4px solid #f26457;
      text-align: center;
      color: #f26457;
      font-size: 11px;
      font-weight: 600;
      &::after {
        content: 'This article contains graphic and disturbing content.';
      }
      @media (min-width: 768px) {
        font-size: 12px;
      }
    }

    .warning-es {
      @apply font-sans;
      width: 85%;
      height: 100%;
      margin: 1em 0em;
      padding: 0.5em 1em;
      background-color: #fce0dd;
      border-left: 4px solid #f26457;
      text-align: center;
      color: #f26457;
      font-size: 11px;
      font-weight: 600;
      &::after {
        content: 'Este artículo tiene un contenido gráfico e inquietante.';
      }
      @media (min-width: 768px) {
        font-size: 12px;
      }
    }
  }
}

html.dark {
  .article__content-wrapper {
    & ::v-deep(.article__content) {
      color: white;
      p {
        color: white;
      }
      a {
        color: var(--green);
      }
      blockquote {
        background-color: #161618;
        color: var(--slate-200);
        border-color: var(--green);
      }
      figcaption {
        color: var(--slate-300);
      }
      .kg-image-card {
        img {
          border-color: var(--slate-600);
        }
      }
      .kg-gallery-container {
        .kg-gallery-row {
          .kg-gallery-image {
            img {
              border-color: var(--slate-600);
            }
          }
        }
      }
      a.link-button {
        color: white;
      }
    }
  }
  .caption-wrapper {
    ::v-deep(.modal-image-caption) {
      color: var(--slate-200);
    }
  }
}
</style>
