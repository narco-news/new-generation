<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
useHead({
  title: 'Articles',
})
const featuredArticles = computed(() => useGhost.listFeaturedFourArticles)
const latestArticles = computed(() => useGhost.listLatestArticles)
</script>

<template>
  <template v-if="featuredArticles">
    <articles-featured
      :articles="featuredArticles"
    />
  </template>
  <div v-if="latestArticles">
    <articles-latest
      :articles="latestArticles"
    />
  </div>
</template>
