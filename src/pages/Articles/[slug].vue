<script setup lang="ts">
//
//  ARTICLE PAGE
//
////////////////////////
// Imports
import { PostsOrPages } from '@tryghost/content-api'
import axios from 'axios'
import { useAsyncData } from '~/helpers/useAsyncData'
import { useGhostStore } from '~/stores/ghost'
import formatDate from '~/composables/formatDate'
//
// Ghost creds
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
//
// Declare route
const route = useRoute()
const router = useRouter()
// Get article from API
// const articleContent = shallowReadonly([])
// const article = ref()
const article = await useAsyncData(
  'content',
  `${uri}/ghost/api/v3/content/posts/slug/${route.params.slug}/?key=${key}&include=tags,authors`,
  {
    awaitSetup: false,
  },
)
const titleMeta = article.value?.posts[0].title
async function changeArticle(newSlug) {
  article.value = null
  await axios
    .get(
      `${uri}/ghost/api/v3/content/posts/slug/${newSlug}/?key=${key}&include=tags,authors`,
    )
    .then((response) => {
      article.value = response.data
    })
  window.scroll(0, 0)
  router.push(`/articles/${newSlug}`)
  document.title = newSlug[1]
}
watchEffect(() => {
  useHead({
    title: titleMeta,
  })
})

useHead({
  // title: article.value?.posts[0].title,
  script: [
    {
      src: 'https://platform.twitter.com/widgets.js',
    },
  ],
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        article.value?.posts[0].excerpt
        || article.value?.posts[0].custom_excerpt,
    },
    {
      hid: 'author',
      name: 'author',
      content: article.value?.posts[0].primary_author?.name,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content:
        article.value?.posts[0].excerpt
        || article.value?.posts[0].custom_excerpt,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: article.value?.posts[0].feature_image,
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: 'narco.news',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: article.value?.posts[0].title,
    },
    { hid: 'og:type', property: 'og:type', content: 'article' },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `https://narco.news/articles/${article.value?.posts[0].slug}`,
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: article.value?.posts[0].feature_image,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: article.value?.posts[0].title,
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: `https://narco.news/articles/${article.value?.posts[0].slug}`,
    },
  ],
})
// // // // // // // // //
//
// Get all articles and put them into store
//
// Tags filter ref
const tagsLocaleFilter = ref()
//
// Declare ghost store
const useGhost = useGhostStore()
//
// Get current locale
const locale = useI18n()
//
// Set tags filter string to regard current locale
if (locale.locale.value === 'es') tagsLocaleFilter.value = 'hash-es'
else tagsLocaleFilter.value = '-hash-es'
//
// Check if store already has articles and make the call if it's empty
if (!useGhost.allArticles[0]) {
  const articles = await useAsyncData<PostsOrPages>(
    'articles',
    `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:${tagsLocaleFilter.value}&include=authors,tags&fields=slug,title,featured,feature_image,primary_author,published_at,excerpt,custom_excerpt`,
    {
      awaitSetup: false,
    },
  )
  // Add posts to store
  useGhost.addArticles(articles.value.posts)
}
//  //  //  //  //
tryOnMounted(() => {
  window.scroll(0, 0)
})
</script>

<template>
  <div class="article-wrapper">
    <div v-if="article">
      <article-image :feature-image="article.posts[0].feature_image" />
      <article-meta
        :article="article.posts[0]"
      />
      <article-content :content="article.posts[0].html" />
      <div class="tags-wrapper">
        <router-link
          v-for="tag in article.posts[0].tags?.slice(0, 4)"
          :key="tag.id"
          :to="`/tags/${tag?.slug}`"
          class="article-meta__tag"
        >
          {{ tag.name }}
        </router-link>
      </div>
      <div class="last-updated">
        Updated:
        {{
          formatDate(article.posts[0].updated_at, 'hh:mm:ss a, MMM DD, YYYY')
        }}
      </div>
      <article-bottom-share-buttons
        :article="article"
      />
      <div ref="moreFromAuthor">
        <article-author-latest
          :author="article.posts[0].primary_author"
          @new-slug="changeArticle($event)"
        />
      </div>
      <div>
        <transition name="slide" mode="in-out">
          <article-bottom-bar
            :title="article.posts[0].title"
            :primary-author="article.posts[0].primary_author"
            :slug="article.posts[0].slug"
            :first-tag="article.posts[0].tags[0]"
            :second-tag="article.posts[0].tags[1]"
          />
        </transition>
      </div>
    </div>
    <div v-else class="loading">
      <FoldingCube />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.comments {
  height: 100%;
  margin: 2rem 0;
  padding: 1rem;
}
.bottom-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottom-buttons__share-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: monospace;
    font-size: 11px;
    margin: 2rem 1rem;
    color: var(--slate-500);
    a {
      box-shadow: 0 0 0 1px var(--slate-400);
      border-radius: 100%;
      display: grid;
      place-content: center;
      padding: 10px;
      transition: all 180ms ease-in;
      svg {
        width: 15px;
        height: 15px;
        filter: brightness(0);
      }
      &:hover {
        box-shadow: 0 0 0 2px var(--green);
        border-color: var(--green);
      }
      &:focus {
        border-color: var(--green);
        box-shadow: 0 0 0 2px var(--green);
        outline: none;
      }
    }
  }
  .copy-button {
    box-shadow: 0 0 0 1px var(--slate-400);
    border: none;
    border-radius: 100%;
    display: grid;
    place-content: center;
    padding: 10px;
    background-color: transparent;
    transition: all 180ms ease-in;
    svg {
      width: 15px;
      height: 15px;
      filter: brightness(0);
    }
    &:hover {
      box-shadow: 0 0 0 2px var(--green);
      border-color: var(--green);
    }
    &:focus {
      border-color: var(--green);
      box-shadow: 0 0 0 2px var(--green);
      outline: none;
    }
  }

  .scroll-top-wrapper {
    margin-right: 2rem;
    .scroll-top__button {
      background: none;
      border: none;
      background-color: var(--slate-100);
      color: black;
      box-shadow: 0 0 0 1px var(--slate-400);
      padding: 10px;
      display: grid;
      place-content: center;
      border-radius: 100%;
      transition: all 180ms ease-in;
      &:hover {
        background-color: var(--slate-100);
        color: var(--green);
        box-shadow: 0 0 0 2px var(--green);
      }
    }
  }
}

@supports (-webkit-touch-callout: none) and (not (translate: none)) {
  .bottom-buttons__share-buttons {
    a {
      margin: 0 0.5rem;
    }
    .copy-button {
      margin: 0 0.5rem;
    }
  }
}
.last-updated {
  margin: 1rem 1rem;
  font-size: 12px;
  font-family: monospace;
  color: var(--slate-500);
}
.tags-wrapper {
  margin: 0 1rem;
  margin-top: 2rem;
  font-size: 12px;
  font-family: monospace;
}
.article-meta__tag {
  display: inline-flex;
  color: var(--green);
  text-decoration: none;
  font-size: 12px;
  margin-right: 1rem;
  border-bottom: 1px dotted var(--green);
}
.article-wrapper {
  overflow: hidden;
}
figure {
  margin: 0;
  padding: 0;
}
.loading {
  display: grid;
  place-content: center;
  height: 100vh;
  @media (min-width: 768px) {
    height: 100vh;
  }
}

html.dark {
  .last-updated {
    color: var(--slate-500);
  }
  .bottom-buttons__share-buttons {
      color: var(--slate-200);
    a {
      box-shadow: 0 0 0 1px var(--green-400);
      color: var(--slate-200);
    }
    .copy-button {
      box-shadow: 0 0 0 1px var(--green-400);
      color: var(--slate-200);
    }
  }
  .scroll-top-wrapper {
    .scroll-top__button {
      background-color: transparent;
      box-shadow: 0 0 0 1px var(--green-400);
      color: var(--slate-200);
    }
  }
}

/*
  Credit to Máximo Mussini for transition
  https://github.com/ElMassimo/iles/blob/main/docs/src/components/DarkModeSwitch.vue
   */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
/* .slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
} */

.slide-enter-from {
  transform: translateY(100%);
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>

<route lang="yaml">
meta:
  layout: article
</route>
