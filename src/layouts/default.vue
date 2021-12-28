<script setup lang="ts">
import { PostsOrPages } from '@tryghost/content-api'
import { useAsyncData } from '~/helpers/useAsyncData'
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
if (!useGhost.allArticles[0]) {
  const articles = await useAsyncData<PostsOrPages>(
    'articles',
    `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:-hash-es&include=authors,tags&fields=slug,title,featured,feature_image,primary_author,published_at,excerpt,custom_excerpt,reading_time`,
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
      <router-view v-bind="$attrs" />
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
  margin-bottom: 4em;
  & .page_wrapper {
    width: 1200px;
  }
}

html.dark {
  & .default-layout {
    background-color: #000000;
  }
}
</style>
