<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
useHead({
  title: 'Articles',
})
const featuredArticles = computed(() => useGhost.listFeaturedFourArticles)
const opinionArticles = computed(() => useGhost.listOpinionArticles)
</script>

<template>
  <template v-if="featuredArticles">
    <articles-featured :articles="featuredArticles" />
  </template>
  <div v-else>
    Loading...
  </div>
  <template v-if="opinionArticles">
    <articles-opinion :articles="opinionArticles" />
  </template>
  <div v-else>
    Loading...
  </div>
</template>
