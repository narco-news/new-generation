<script setup lang="ts">
import { PostsOrPages } from '@tryghost/content-api'
import { useAsyncData } from '~/helpers/useAsyncData'
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
// To prevent problems if user enters site through an article
// we grab all the articles and load them into the store
// to prevent having to make the call after they hit
// the browser back button. We check to make sure allArticles
// is empty before making the call as to not be repetitive and cause
// UI transition funkiness
if (!useGhost.allArticles[0]) {
  const articles = await useAsyncData<PostsOrPages>(
    'articles',
    `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:-hash-es&include=authors,tags&fields=slug,title,featured,feature_image,primary_author,published_at,excerpt,custom_excerpt,reading_time`,
    {
      awaitSetup: false,
    },
  )
  // Add posts to store
  useGhost.addArticles(articles.value.posts)
}
</script>

<template>
  <main class="article-layout">
    <div class="article-layout__page_wrapper">
      <!-- <router-view v-bind="$attrs" /> -->
      <router-view />
    </div>
  </main>
  <footer>
    <the-footer />
  </footer>
</template>

<style lang="postcss" scoped>
.article-layout {
  display: flex;
  justify-content: center;
  background-color: var(--slate-100);
  margin-bottom: 4em;
  & .article-layout__page_wrapper {
    /* border: 2px solid red;
    padding: 5px; */
    width: 1000px;
  }
}

html.dark {
  & .article-layout {
    background-color: #000000;
  }
}
</style>
