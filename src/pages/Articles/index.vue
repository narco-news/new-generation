<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const latestArticles = computed(() => useGhost.listLatestArticles)
useHead({
  title: 'Articles',
})
</script>

<template>
  <section>
    <div v-if="latestArticles.length">
      <articles-latest
        :articles="latestArticles"
      />
    </div>
    <div v-else class="loading">
      <FoldingCube />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.loading {
  display: grid;
  place-content: center;
  width: 100%;
  height: 90vh;
  @media (min-width: 1024px) {
    height: 100vh;
  }
}
</style>
