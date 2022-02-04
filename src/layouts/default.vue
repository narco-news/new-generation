<script setup lang="ts">
import { useAsyncData } from '~/helpers/useAsyncData'
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const locale = useI18n()
const filter = ref()
if (locale.locale.value === 'es')
  filter.value = 'hash-es'
else
  filter.value = '-hash-es'
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
if (!useGhost.allArticles[0]) {
  const articles = await useAsyncData(
    'articles',
    `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:${filter.value}&include=authors,tags&fields=slug,title,featured,feature_image,primary_author,published_at,excerpt,custom_excerpt`,
    {
      awaitSetup: false,
    },
  )
  useGhost.addArticles(articles.value.posts)
}
</script>
<template>
  <header>
    <the-nav />
  </header>
  <main class="default-layout">
    <div class="page_wrapper">
      <!-- <router-view v-bind="$attrs" /> -->
      <router-view />
    </div>
  </main>
  <footer>
    <the-footer />
  </footer>
</template>

<style lang="postcss" scoped>
.default-layout {
  display: flex;
  justify-content: center;
  background-color: var(--slate-100);
  margin-top: 2em;
  margin-bottom: 18em;
  @media (max-width: 768px) {
    margin-top: 3em;
  }
  & .page_wrapper {
    width: 100%;
    max-width: 1200px;
  }
}

footer {
  margin: 0 auto;
}

html.dark {
  & .default-layout {
    background-color: #000000;
  }
}
</style>
