<script setup lang="ts">
import { useAsyncData } from '~/helpers/useAsyncData'
import { useGhostStore } from '~/stores/ghost'
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
const useGhost = useGhostStore()
const locale = useI18n()
const filter = ref()
if (locale.locale.value === 'es')
  filter.value = 'hash-es'
else
  filter.value = '-hash-es'
if (!useGhost.allArticles[0]) {
  const articles = await useAsyncData(
    'articles',
    `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:${filter.value}&include=authors,tags&formats=html&fields=slug,title,featured,feature_image,primary_author,published_at,excerpt,custom_excerpt,reading_time,html`,
    {
      awaitSetup: false,
    },
  )
  useGhost.addArticles(articles.value.posts)
}
</script>

<template>
  <main class="layout-404">
    <router-view />
  </main>
</template>

<style lang="postcss" scoped>
.layout-404 {
  display: grid;
  place-content: center;
  background-color: var(--slate-100);
  height: 100vh;
}
</style>
