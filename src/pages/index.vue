<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
// // Store
const useGhost = useGhostStore()
const featuredArticles = computed(() => useGhost.listFeaturedFourArticles)
</script>

<template>
  <template v-if="featuredArticles">
    <articles-featured :articles="featuredArticles" />
  </template>
  <div v-else>
    Loading...
  </div>
</template>
