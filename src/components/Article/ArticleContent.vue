<script setup lang="ts">
import { onKeyUp } from '@vueuse/core'
import reframe from 'reframe.js'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import typeset from 'typeset'
import devalue from '@nuxt/devalue'
const typesetOptions = {
  disable: ['hyphenate', 'ligatures'],
}
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
  const allGalleryImages = Array.from(document.getElementsByClassName('kg-gallery-image'))
  allGalleryImages.forEach((element) => {
    const image = element.getElementsByTagName('img')
    image[0].loading = 'lazy'
    image[0].onclick = () => {
      largeImage(image[0])
    }
  })
  const allSingleImages = Array.from(document.getElementsByClassName('kg-image'))
  allSingleImages.forEach((element) => {
    element.loading = 'lazy'
    element.onclick = () => {
      largeImage(element)
    }
  })
  // Links
  const container = document.querySelector('.article__content')
  const allLinks = Array.from(container.querySelectorAll('a'))
  allLinks.forEach((link) => {
    // const regexLocal = /localhost/g
    const regex = /https:\/\/narco.news/g
    const regexDiscord = /^https:\/\/discord.gg/g
    if (!link.href.match(regex) && !link.href.match(regexDiscord)) {
      link.target = '_blank'
      link.className = `${link.className} external-link`
    }
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
//
// On route update
onBeforeRouteUpdate(() => {
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
/* #app > main > section > div > div > div.modal-mask > div > div.modal-container > img { */
#app > main > div > section > div:nth-child(2) > div.modal-mask > div > div.modal-container > img {
  width: 100%;
  height: 100%;
  max-height: 80vh;
  padding: 1rem;
  @media (min-width: 1024px) {
    padding: 0;
    object-fit: contain;
    aspect-ratio: 1/1;
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
    font-family: var(--font-normal);
    font-size: var(--step-0);
    font-weight: 400;
    overflow: hidden;
    max-width: 75ch;

    /* Main content paragraphs */
    p {
      color: var(--slate-900);
      font-family: var(--font-normal);
      margin: 0 auto;
      margin-bottom: 2rem;
      padding: 0 var(--space-2xs);
      width: 100%;
      max-width: 65ch;
      line-height: 1.7;
    }

    hr {
      border: none;
      background: none;
      height: 1px;
      background-color: var(--green);
      opacity: 60%;
      max-width: 500px;
    }

    strong {
      font-weight: 600;
    }

    em {
      font-style: italic;
    }
    /* Links */
    a {
      font-family: var(--font-normal);
      color: var(--green);
      text-decoration: underline 2px dotted var(--green);
      text-underline-offset: 6px;
    }
    /* Subheadings */
    h2, h3 {
      color: var(--green);
      font-family: var(--font-title);
      font-size: var(--step-3);
      margin: 0;
      margin-top: 4rem;
      margin-bottom: 2rem;
      padding: 0;
    }
    /* Blockquote */
    blockquote {
      font-family: var(--font-title);
      font-size: var(--step--2);
      font-style: italic;
      color: var(--green);
      background-color: var(--slate-200);
      box-shadow: 0 0 0 1px var(--green);
      border-radius: 4px;
      margin: 3rem 1px;
      padding: var(--space-m);
      max-width: 700px;
      line-height: 1.4;
      @media (min-width: 768px) {
        margin: 3rem auto;
      }

      em {
        color: var(--green);
      }

      strong {
        color: var(--green);
        font-weight: 700;
      }
    }

    /* Videos */
    video {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      margin-bottom: 1rem;
      padding: 2px;
      border: 1px solid var(--slate-300);
      background-color: var(--slate-300);
      @media (min-width: 768px) {
        display: block;
        max-height: 700px;
        max-width: 700px;
        margin: 0 auto;
        margin-bottom: 2rem;
      }
    }
    /* iFrame */
    iframe {
      box-shadow: 0 0 0 1px var(--slate-200);
      background-color: var(--slate-200);
      border-radius: 4px;
      margin: var(--space-xs) 0;
    }

    .js-reframe {
      /* overflow: hidden; */
      margin-bottom: 3rem;
      @media (min-width: 1140px) {
        margin-bottom: 4rem;
      }
    }

    figcaption {
      font-size: 12px;
      color: var(--slate-600);
      a {
        text-decoration: none;
      }
    }

    .kg-image-card {
      margin: var(--space-l) 0;
      padding: 2px;
      &.kg-card-hascaption {
        margin: 2rem 0;
        padding: 2px;
        @media (min-width: 768px) {
          height: 100%;
          max-width: 500px;
          margin: 0 auto;
          margin-bottom: 2rem;
          display: block;
        }
        @media (min-width: 1140px) {
          height: 100%;
          max-width: 700px;
          margin: 0 auto;
          margin-bottom: 2rem;
          display: block;
        }
        img {
          box-shadow: 0 0 0 1px var(--slate-400);
          border-radius: 6px;
          width: 100%;
          height: 100%;
        }
        figcaption {
          padding-left: var(--space-xs);
          padding-top: var(--space-3xs);
          font-family: var(--font-mono);
          max-width: 95%;
          a {
            color: var(--green);
          }
        }
      }
      &.kg-card {
        margin: 2rem 0;
        padding: 2px;
        @media (min-width: 768px) {
          height: 100%;
          max-width: 500px;
          margin: 0 auto;
          margin-bottom: 2rem;
          display: block;
        }
        @media (min-width: 1140px) {
          height: 100%;
          max-width: 700px;
          margin: 0 auto;
          margin-bottom: 2rem;
          display: block;
        }
        img {
          box-shadow: 0 0 0 1px var(--slate-400);
          border-radius: 6px;
          width: 100%;
          height: 100%;
        }
        figcaption {
          padding-left: var(--space-xs);
          padding-top: var(--space-3xs);
          font-family: var(--font-mono);
          max-width: 95%;
          a {
            color: var(--green);
          }
        }
      }
    }
    .kg-gallery-card {
      margin: 0;
      margin-bottom: 2rem;
      padding: 0;
      .kg-gallery-container {
        margin: 0;
        padding: 0;
        .kg-gallery-row {
          --min: 15ch;
          --aspect-ratio: 4/3;
          --gap: var(--space-2xs);

          display: flex;
          flex-wrap: wrap;
          gap: 0;

          & > * {
            flex: 1 1 var(--min);
          }

          .kg-gallery-image {
              padding: 0 1px;
              margin: var(--space-3xs);
            img {
              display: block;
              object-fit: cover;
              object-position: top left;
              width: 100%;
              height: 100%;
              box-shadow: 0 0 0 1px var(--slate-400);
              border-radius: 4px;
              @media (min-width: 1140px) {
                /* aspect-ratio: 1/1; */
              }
            }
          }
          @supports not (aspect-ratio: 1/1) {
            & > * {
              margin: 0.5rem;
            }
            img {
              height: max(25vh, 15rem);
            }
          }
        }
      }
      figcaption {
        padding-left: var(--space-xs);
        padding-top: var(--space-2xs);
        font-family: var(--font-mono);
        max-width: 95%;
        a {
          color: var(--green);
        }
      }
    }

    .kg-gallery-card.kg-card-hascaption {
      margin: 0;
      margin-bottom: 2rem;
      padding: 0;
      .kg-gallery-container {
        margin: 0;
        padding: 0;
        .kg-gallery-row {
          --min: 15ch;
          --aspect-ratio: 4/3;
          --gap: var(--space-2xs);

          display: flex;
          flex-wrap: wrap;
          gap: 0;

          & > * {
            flex: 1 1 var(--min);
          }

          .kg-gallery-image {
              padding: 0 1px;
              margin: var(--space-3xs);
            img {
              display: block;
              object-fit: cover;
              object-position: top left;
              width: 100%;
              height: 100%;
              box-shadow: 0 0 0 1px var(--slate-400);
              border-radius: 4px;
              @media (min-width: 1140px) {
                /* aspect-ratio: 1/1; */
              }
            }
          }
          @supports not (aspect-ratio: 1/1) {
            & > * {
              margin: 0.5rem;
            }
            img {
              height: max(25vh, 15rem);
            }
          }
        }
      }
      figcaption {
        padding-left: var(--space-xs);
        padding-top: var(--space-2xs);
        font-family: var(--font-mono);
        max-width: 95%;
        a {
          color: var(--green);
        }
      }
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
        content: "Article Link";
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
        content: "This article contains graphic and disturbing content.";
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
        content: "Este artículo tiene un contenido gráfico e inquietante.";
      }
      @media (min-width: 768px) {
        font-size: 12px;
      }
    }

    /* TWITER EMBED */
  }
}

html.dark {
  .article__content-wrapper {
    & ::v-deep(.article__content) {
      color: var(--slate-200);
      p {
        color: var(--slate-200);
      }
      a {
        color: var(--green-400);
      }
      blockquote {
        background-color: #141416;
        color: var(--green-400);
        box-shadow: 0 0 0 1px var(--green);
        a {
          color: var(--green-400);
        }
        em {
          color: var(--green-400);
        }
        strong {
          color: var(--green-400);
        }
      }
      figcaption {
        color: var(--slate-300);
        a {
          color: var(--green-400) !important;
        }
      }

      video {
        background-color: black;
        box-shadow: 0 0 0 1px var(--slate-400);
      }

      .kg-image-card {
        img {
          box-shadow: 0 0 0 1px var(--slate-400);
        }
      }

      .kg-gallery-image {
        img {
          box-shadow: 0 0 0 1px var(--slate-400) !important;
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
