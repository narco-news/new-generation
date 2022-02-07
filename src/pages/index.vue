<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
useHead({
  title: 'Home',
})
const useGhost = useGhostStore()
const latestListFive = computed(() => useGhost.listLatestFive)
const featuredArticles = computed(() => useGhost.listFeaturedFourArticles)
const latestList = computed(() => useGhost.listLatestList)
const translationArticles = computed(() => useGhost.listTranslationArticles)
const aroundTheWebArticles = computed(() => useGhost.listAroundTheWebArticles)
</script>

<template>
  <section>
    <div v-if="latestListFive">
      <LatestFive
        :articles="latestListFive"
      />
    </div>
    <div v-if="featuredArticles.length">
      <ArticlesFeatured
        :articles="featuredArticles"
      />
    </div>
    <div v-if="latestList">
      <LatestList
        :articles="latestList"
      />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
</style>
